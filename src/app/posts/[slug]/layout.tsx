import { usePathname } from 'next/navigation';

export const metadata = {
  title: `Post | Ignews`,
  description: 'Ignews by Rockseat',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
