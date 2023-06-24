import { stripe } from '@/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { saveSubscription } from '../../_lib/manageSubscription';

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body;

  const buf = await buffer(Readable.from(body));

  const headersList = headers();
  const secret = headersList.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      secret as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 },
    );
  }

  const { type } = event;

  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await saveSubscription(
            subscription.id,
            subscription.customer.toString(),
            false,
          );
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          await saveSubscription(
            checkoutSession.subscription?.toString() as string,
            checkoutSession.customer?.toString() as string,
            true,
          );
          break;
        default:
          throw new Error('Unhandled event.');
      }
    } catch (error: any) {
      return NextResponse.json({ error: 'Webhook handler failed.' });
    }
    console.log('Evento recebido', event);
  }

  return NextResponse.json(buf, { status: 200 });
}
