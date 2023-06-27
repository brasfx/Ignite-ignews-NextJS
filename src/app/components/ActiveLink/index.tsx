'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: string;
  activeClassName: string;
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const asPath = usePathname();

  const className = asPath?.includes(rest.href as string)
    ? activeClassName
    : '';
  return (
    <Link className={className} {...rest}>
      {children}
    </Link>
  );
}
