import Image from 'next/image';
import notFound from '../assets/page-not-found.gif';
import variables from '../styles/variables.module.scss';

export default function NotFound() {
  return (
    <div className={variables.box}>
      <Image
        src={notFound}
        width={900}
        height={600}
        alt="Picture of the author"
        priority={true}
      />
    </div>
  );
}
