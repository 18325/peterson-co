import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { fedapay } from '@/lib/fedapay';
import { triggerWhatsAppNotification } from '@/lib/whatsapp';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fedapayId = searchParams.get('id');
  const statusParam = searchParams.get('status');

  if (!fedapayId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-result?status=error&message=Missing transaction ID`);
  }

  try {
    // 1. Fetch real status from FedaPay
    const transaction = await fedapay.getTransactionStatus(parseInt(fedapayId));

    // 2. Check local DB record
    const row = db.prepare('SELECT status, phone, description FROM transactions WHERE fedapay_id = ?').get(fedapayId) as any;

    if (!row) {
      // Should not happen if created correctly
      console.warn(`Transaction ${fedapayId} not found in local DB`);
    }

    // 3. Update if not already approved
    if (transaction.status === 'approved' && row?.status !== 'approved') {
      db.prepare('UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE fedapay_id = ?')
        .run('approved', fedapayId);

      // Trigger WhatsApp notification to buyer + admin
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
       db.prepare('UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE fedapay_id = ?')
        .run(transaction.status, fedapayId);
    }

    // 4. Redirect to Result page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-result?status=${transaction.status}&id=${fedapayId}`);
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-result?status=error`);
  }
}
