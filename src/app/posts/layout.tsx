import { usePathname } from 'next/navigation';

export const metadata = {
  title: `Posts | ig.news`,
  description: 'Ignews by Rockseat',
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
