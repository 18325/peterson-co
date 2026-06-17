import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { fedapay } from '@/lib/fedapay';
import { triggerWhatsAppNotification } from '@/lib/whatsapp';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('FedaPay Webhook Received:', body);

    const fedapayId = body.entity?.id || body.id;

    if (!fedapayId) {
      return NextResponse.json({ error: 'No transaction ID found' }, { status: 400 });
    }

    const transaction = await fedapay.getTransactionStatus(parseInt(fedapayId));

    const result = await db.execute({
      sql: 'SELECT status, phone, description FROM transactions WHERE fedapay_id = ?',
      args: [fedapayId],
    });
    const row = result.rows[0] as any;

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
        console.warn(`[Webhook] Missing phone or description for FedaPay #${fedapayId}, skipping WhatsApp.`);
      }
    } else if (transaction.status !== 'approved' && row) {
      await db.execute({
        sql: 'UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE fedapay_id = ?',
        args: [transaction.status, fedapayId],
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
