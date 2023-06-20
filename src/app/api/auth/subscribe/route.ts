import { stripe } from '@/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

export async function POST(request: NextApiRequest, res: NextApiResponse) {
  const session = await getSession();

  const stripeCustomer = await stripe.customers.create({
    email: session?.user?.email as string,
  });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [{ price: 'price_1NHuaSEbOrbprdlSskDY3nA3', quantity: 1 }],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL as string,
    cancel_url: process.env.STRIPE_CANCEL_URL as string,
  });

  return NextResponse.json(
    { sessionId: stripeCheckoutSession.id },
    { status: 200 },
  );
}
