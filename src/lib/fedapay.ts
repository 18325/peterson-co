const FEDAPAY_API_URL = process.env.FEDAPAY_API_URL || 'https://sandbox-api.fedapay.com/v1';
const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY;

export interface FedaPayTransactionResponse {
  id: number;
  reference: string;
  amount: number;
  status: string;
  [key: string]: any;
}

export interface FedaPayTokenResponse {
  token: string;
  url: string;
}

export const fedapay = {
  async createTransaction(data: {
    amount: number;
    description: string;
    callback_url: string;
    customer: {
      firstname: string;
      lastname: string;
      email: string;
      phone_number: {
        number: string;
        country: string;
      };
    };
  }): Promise<FedaPayTransactionResponse> {
    const response = await fetch(`${FEDAPAY_API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FEDAPAY_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        currency: { iso: 'XOF' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create transaction');
    }

    const res = await response.json();
    console.log('FedaPay Create Response:', JSON.stringify(res, null, 2));
    
    const transaction = res['v1/transaction'] || res.transaction || res;
    return transaction;
  },

  async generateToken(transactionId: number): Promise<FedaPayTokenResponse> {
    const response = await fetch(`${FEDAPAY_API_URL}/transactions/${transactionId}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FEDAPAY_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate token');
    }

    return response.json();
  },

  async getTransactionStatus(transactionId: number): Promise<FedaPayTransactionResponse> {
    const response = await fetch(`${FEDAPAY_API_URL}/transactions/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${FEDAPAY_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get transaction status');
    }

    const data = await response.json();
    return data['v1/transaction'] || data.transaction || data;
  },
};
