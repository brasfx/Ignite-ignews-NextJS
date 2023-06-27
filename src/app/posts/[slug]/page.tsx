import { NextApiRequest } from 'next';
import { useSession } from 'next-auth/react';
import { createClient } from '../../../prismicio';
import * as prismicH from '@prismicio/helpers';
import Head from 'next/head';
import styles from './post.module.scss';
import { getServerSession } from 'next-auth';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const convertSlugToText = (slug: string) => {
    const words = slug.split('-');

    const title = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    return title;
  };

  return {
    title: `${convertSlugToText(slug)} | ig.news`,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  //const session = await getServerSession();

  const { slug } = params;

  const client = createClient();

  const response = await client.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content),
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
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
