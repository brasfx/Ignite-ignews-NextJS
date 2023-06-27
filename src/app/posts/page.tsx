import Head from 'next/head';
import styles from './styles.module.scss';
import { createClient } from '../../prismicio';
import * as prismicH from '@prismicio/helpers';
import Link from 'next/link';

export default async function Posts() {
  const client = createClient();

  const response = await client.getAllByType('post');

  const posts = await response.map((post) => {
    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    };
  });

  return (
    <main className={styles.container}>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
