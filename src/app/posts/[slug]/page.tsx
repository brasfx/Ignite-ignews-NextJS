'use client';
import { NextApiRequest } from 'next';
import { useSession } from 'next-auth/react';
import { createClient } from '../../../prismicio';
import * as prismicH from '@prismicio/helpers';
import Head from 'next/head';
import styles from './post.module.scss';

export default async function Post({ params }: { params: { slug: string } }) {
  //const { data: session, status } = useSession();
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
    <>
      <Head>
        <title>{post?.title} | Ignews</title>
      </Head>
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
    </>
  );
}
