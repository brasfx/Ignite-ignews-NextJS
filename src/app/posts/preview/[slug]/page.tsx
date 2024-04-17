'use client';
import { createClient } from '../../../../prismicio';
import * as prismicH from '@prismicio/helpers';
import styles from '../../[slug]/post.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = params;
//   return {
//     title: `${slug} | ig.news`,
//   };
// }

interface ParamsProsps {
  params: {
    slug: string | null;
  };
}

export const revalidate = 1800; // 30 minutos

export default async function PostPreview({ params }: ParamsProsps) {
  const { data: session, status } = useSession();
  const { slug } = params;

  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription && status === 'authenticated') {
      router.push(`/posts/${slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const client = createClient();

  const response = await client.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content?.splice(0, 2)) as string,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  };

  return (
    <main className={styles.container}>
      <article className={styles.post}>
        <h1>{post?.title}</h1>
        <time>{post.updatedAt}</time>
        <div
          className={`${styles.postContent} ${styles.previewContent}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className={styles.continueReading}>
          Wanna continue reading ? <Link href="/">Subscribe now 🤗</Link>
        </div>
      </article>
    </main>
  );
}
