import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { fedapay } from '@/lib/fedapay';
import { normalisePhone } from '@/lib/whatsapp';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstname, lastname, phone, amount, description } = body;

    if (!email || !amount || !phone) {
      return NextResponse.json({ error: 'Email, phone and amount are required' }, { status: 400 });
    }

    const normalisedPhone = normalisePhone(phone);
    if (!normalisedPhone) {
      return NextResponse.json(
        { error: 'Numéro de téléphone invalide. Veuillez entrer un numéro au format international (ex: +22997000000).' },
        { status: 400 }
      );
    }

    const localId = crypto.randomUUID();

    await db.execute({
      sql: 'INSERT INTO transactions (id, email, phone, amount, description, status) VALUES (?, ?, ?, ?, ?, ?)',
      args: [localId, email, phone, amount, description, 'pending'],
    });

    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pay/callback`;

    const transaction = await fedapay.createTransaction({
      amount,
      description: description || 'Payment',
      callback_url: callbackUrl,
      customer: {
        firstname: firstname || 'Customer',
        lastname: lastname || '',
        email: email,
        phone_number: {
          number: phone,
          country: 'bj',
        },
      },
    });

    await db.execute({
      sql: 'UPDATE transactions SET fedapay_id = ? WHERE id = ?',
      args: [transaction.id, localId],
    });

    return NextResponse.json({
      url: transaction.payment_url,
      transactionId: transaction.id,
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
