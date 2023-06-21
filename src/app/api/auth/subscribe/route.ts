import { stripe } from '@/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { query as q } from 'faunadb';
import { fauna } from '@/services/fauna';

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession();

  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session?.user?.email as string),
      ),
    ),
  );

  let customerId = user.data.stripe_customer_id;

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: session?.user?.email as string,
    });

    await fauna.query(
      q.Update(q.Ref(q.Collection('users'), user.ref.id), {
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      }),
    );

    customerId = stripeCustomer.id;
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
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
