import { Nunito } from 'next/font/google';

export const metadata = {
  title: 'Carrinho',
  description: 'Ignews by Rockseat',
};

const nunito = Nunito({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function CartLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={nunito.className}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>Minha navbar da página</nav>

      {children}
    </section>
  );
}
