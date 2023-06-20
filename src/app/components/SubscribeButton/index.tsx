'use client';
import React from 'react';
import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/react';
import { api } from '@/services/api';
import { getStripeJs } from '@/services/stripe-js';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session, status } = useSession();

  const handleSubscribe = async () => {
    if (status !== 'authenticated') {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/auth/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId: sessionId });
    } catch (error: any) {
      alert(error?.message);
      console.error(error?.message);
    }
  };
  return (
    <button
      onClick={handleSubscribe}
      className={styles.subscribeButton}
      type="button"
    >
      Subscribe now
    </button>
  );
}
