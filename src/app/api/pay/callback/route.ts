import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { fedapay } from '@/lib/fedapay';
import { triggerWhatsAppNotification } from '@/lib/whatsapp';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fedapayId = searchParams.get('id');

  if (!fedapayId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-result?status=error&message=Missing transaction ID`);
  }

  try {
    const transaction = await fedapay.getTransactionStatus(parseInt(fedapayId));

    const result = await db.execute({
      sql: 'SELECT status, phone, description FROM transactions WHERE fedapay_id = ?',
      args: [fedapayId],
    });
    const row = result.rows[0] as any;

    if (!row) {
      console.warn(`Transaction ${fedapayId} not found in local DB`);
    }

    if (transaction.status === 'approved' && row?.status !== 'approved') {
      await db.execute({
        sql: 'UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE fedapay_id = ?',
        args: ['approved', fedapayId],
      });

      if (row?.phone && row?.description) {
        await triggerWhatsAppNotification({
          phone: row.phone,
          description: row.description,
          fedapayId,
        });
      } else {
        console.warn(`[Callback] Missing phone or description for FedaPay #${fedapayId}, skipping WhatsApp.`);
      }
    } else if (transaction.status !== 'approved') {
      await db.execute({
        sql: 'UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE fedapay_id = ?',
        args: [transaction.status, fedapayId],
      });
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-result?status=${transaction.status}&id=${fedapayId}`);
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-result?status=error`);
  }
}
