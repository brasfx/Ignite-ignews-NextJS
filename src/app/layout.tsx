import { Inter, Roboto } from 'next/font/google';
import { Header } from './components/Header';
import { NextAuthProvider } from './providers';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '../prismicio';
import '../styles/global.scss';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Home | ig.news',
  description: 'Ignews by Rockseat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={roboto.className}>
        <NextAuthProvider>
          <Header />
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
