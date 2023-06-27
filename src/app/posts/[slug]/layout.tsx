import { usePathname } from 'next/navigation';

export const metadata = {
  title: `Post | ig.news`,
  description: 'Ignews by Rockseat',
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
