import Image from 'next/image';
import variables from '../styles/variables.module.scss';

export default function NotFound() {
  return (
    <div className={variables.box}>
      <Image
        src="/images/page-not-found.gif"
        width={900}
        height={600}
        alt="page-not-found"
        priority={true}
      />
    </div>
  );
}
