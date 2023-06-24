import Image from 'next/image';
import '../styles/global.scss';
import styles from './home.module.scss';

import { SubscribeButton } from './components/SubscribeButton';
import { stripe } from '@/services';

export const revalidate = 86400; // 24 hours

export default async function Home() {
  const price = await stripe.prices.retrieve('price_1NHuaSEbOrbprdlSskDY3nA3');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format((price.unit_amount as number) / 100),
  };

  return (
    <>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image
          src="/images/avatar.svg"
          alt="Girl coding"
          width={336}
          height={521}
        />
      </main>
    </>
  );
}
