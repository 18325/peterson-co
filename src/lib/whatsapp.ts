/**
 * whatsapp.ts
 * Sends WhatsApp notifications via the configured n8n webhook after a
 * successful payment. Targets both the buyer and the admin.
 */

interface TriggerOptions {
  phone: string;       // raw phone stored in DB (may include +, spaces, etc.)
  description: string; // what the user purchased (from transactions.description)
  fedapayId: string | number;
}

/**
 * Normalises a phone number to the E.164-style string without the leading "+".
 * Returns null when the number is not a plausible international number.
 *
 * Rules applied:
 *  - Strip all whitespace, dashes, dots, parentheses and a leading "+"
 *  - Reject anything not made of digits afterward
 *  - Reject numbers shorter than 7 or longer than 15 digits (ITU-T E.164)
 */
export function normalisePhone(raw: string): string | null {
  // It must start with a + to be considered an international number
  if (!raw.startsWith('+')) {
    return null;
  }

  // Remove the leading + and any formatting characters
  const cleaned = raw.replace(/^\+/, '').replace(/[\s\-().]/g, '');

  // Must be all digits
  if (!/^\d+$/.test(cleaned)) return null;

  // E.164 without "+": 7–15 digits
  if (cleaned.length < 7 || cleaned.length > 15) return null;

  return cleaned;
}

/**
 * Fires a POST request to the WhatsApp/n8n webhook with three fields:
 *  - receiver       : sanitised international phone number (no "+")
 *  - receiver_message : French purchase confirmation for the buyer
 *  - admin_message  : French admin notification
 *
 * Throws if WHATSAPP_WEBHOOK env var is not set.
 * Returns false (with a warning) when the phone number is invalid so that the
 * caller can decide whether to abort the overall flow.
 */
export async function triggerWhatsAppNotification({
  phone,
  description,
  fedapayId,
}: TriggerOptions): Promise<boolean> {
  const webhookUrl = process.env.WHATSAPP_WEBHOOK;

  if (!webhookUrl) {
    throw new Error('WHATSAPP_WEBHOOK environment variable is not set.');
  }

  const receiver = normalisePhone(phone);

  if (!receiver) {
    console.warn(
      `[WhatsApp] Skipping notification for FedaPay #${fedapayId}: ` +
        `"${phone}" is not a valid international phone number.`
    );
    return false;
  }

  const receiver_message =
    `Bonjour ! Votre paiement a bien été reçu. ` +
    `Vous avez acheté : *${description}*. ` +
    `Vos identifiants de connexion vous seront envoyés très prochainement. ` +
    `Merci pour votre confiance !`;

  const admin_message =
    `🔔 Nouvelle commande — Le numéro *+${receiver}* vient d'acheter *${description}* ` +
    `(Transaction FedaPay #${fedapayId}). Merci de traiter la commande dès que possible.`;

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiver, receiver_message, admin_message }),
    });

    if (!res.ok) {
      console.error(
        `[WhatsApp] Webhook responded with status ${res.status} for FedaPay #${fedapayId}.`
      );
      return false;
    }

    console.log(`[WhatsApp] Notification sent successfully for FedaPay #${fedapayId}.`);
    return true;
  } catch (err) {
    console.error(`[WhatsApp] Failed to reach webhook for FedaPay #${fedapayId}:`, err);
    return false;
  }
}
