import Layout from '@/layouts/default';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      <h1 className="pt-6 text-2xl font-medium">Login</h1>
      <p className="pt-6">
        Tentalce does not yet have a login system. Bear in mind that this is a
        prototype version to explore what could be done. If you like the idea of
        Tentacle, help us to shape this idea further.
        <p className="pt-6">
          Tentacle is open source and{' '}
          <a
            className="underline"
            href="https://github.com/stefanbuck/tentacle-app"
          >
            available on GitHub
          </a>
          .
        </p>
      </p>
      <Link href="/" passHrefpassHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="bg-black text-white py-1 px-2 mt-6 inline-block">
          Back
        </a>
      </Link>
    </Layout>
  );
}
