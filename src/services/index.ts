import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_API_KEY as string;

export const stripe = new Stripe(stripeKey, {
  apiVersion:'2022-11-15',
  appInfo: {
    name: 'IgNews',
    version: '0.1.0',
  },
});
