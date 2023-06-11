import React from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';
import { SignInButton } from '../SignInButton';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="images/logo.svg" alt="logo" width={110} height={31} />
        <nav>
          <a className={styles.active}>Home</a>
          <a className={styles.active}>Posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
