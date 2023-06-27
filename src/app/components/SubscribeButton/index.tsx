'use client';
import React from 'react';
import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/react';
import { api } from '@/services/api';
import { getStripeJs } from '@/services/stripe-js';
import { useRouter } from 'next/navigation';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleSubscribe = async () => {
    if (status !== 'authenticated') {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
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
