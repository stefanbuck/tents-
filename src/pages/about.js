import Layout from '@/layouts/default';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      <h1 className="pt-6 text-2xl font-medium">About</h1>
      <p className="pt-6">
        Staying on top of issues and pull requests is a great way to follow the
        evolution of a project. However, it can be difficult to keep track of
        all the changes and discussion especially when the project is moving
        fast.
      </p>
      <p className="pt-6">
        If you subscribe to a project, you will receive notifications of new
        issues and pull requests, as well as any comments that are made.
        However, the amount of information you see in your notifications inbox
        is limited. if you want to see more information beyond title, author,
        and date, you have to open every issue and pull request in your browser.
        Wouldn&apos;t it be nice if you could just scroll through the list as
        you do on Twitter?
      </p>
      <p className="pt-6">
        Meet Tentacle, a web app that allows you to consume updates much faster.
        Define your search query, and you will receive a list of all issues and
        pull requests that match your query. The Tentacle project does not aim
        to replace the GitHub notification center. In fact, it does not use any
        GitHub notification information at all. That way your GitHub inbox
        remains reserved for your personal notification.
      </p>
      <h2 className="pt-6 text-xl font-medium">You like the idea?</h2>

      <p className="pt-6">
        Tentacle is open source and{' '}
        <a
          className="underline"
          href="https://github.com/stefanbuck/tentacle-app"
        >
          available on GitHub
        </a>
        . Join our{' '}
        <a className="underline" href="https://discord.gg/SQcgmVwXXg">
          Discord
        </a>{' '}
        to shape and discuss the project and give us a star.
      </p>
      <h2 className="pt-6 text-xl font-medium">Meet the team</h2>

      <p className="pt-6">
        <a className="underline" href="https://stefanbuck.com">
          Stefan Buck
        </a>{' '}
        (Software Engineer) and{' '}
        <a className="underline" href="https://www.matt-evans.co.uk/">
          Matthew Evans
        </a>{' '}
        (UX Designer) started the Tentacle project in late 2020.
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
