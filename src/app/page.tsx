import Image from 'next/image';
import '../styles/global.scss';
import styles from './home.module.scss';
import { Header } from './components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>
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
