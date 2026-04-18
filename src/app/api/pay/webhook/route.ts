import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { fedapay } from '@/lib/fedapay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('FedaPay Webhook Received:', body);

    const fedapayId = body.entity?.id || body.id;

    if (!fedapayId) {
      return NextResponse.json({ error: 'No transaction ID found' }, { status: 400 });
    }

    //Fetch the status from the source API to verify the webhook data
    const transaction = await fedapay.getTransactionStatus(parseInt(fedapayId));

    // Check local DB
    const row = db.prepare('SELECT status FROM transactions WHERE fedapay_id = ?').get(fedapayId) as any;

    if (transaction.status === 'approved' && row?.status !== 'approved') {
      db.prepare('UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE fedapay_id = ?')
        .run('approved', fedapayId);

      // --- TRIGER OTHER BACKEND FUNCTION (WhatsApp notif) ---
      console.log(`[WEBHOOK] Payment SUCCESS for FedaPay ID: ${fedapayId}. Triggering backend logic...`);
      // await triggerPostPaymentActions(fedapayId);
      // -------------------------------------
    } else if (transaction.status !== 'approved' && row) {
       db.prepare('UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE fedapay_id = ?')
        .run(transaction.status, fedapayId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
