import Layout from '@/layouts/default';

export default function AboutPage() {
  return (
    <Layout>
      <h1 className="pt-6 text-2xl font-medium">About</h1>
      <p className="pt-6">
        Tentacle is just a casual way of consuming content from GitHub in a
        twitter-like manner
      </p>
      <p className="pt-6">
        The amount of information you get in your notification inbox is limited
        to a few metadata like title, author, date, and event type. To get
        additional information like the description, you have to open every
        single notification.
      </p>
      <p className="pt-6">
        The Tentacle project does not aim to replace the GitHub notification
        center. In fact it does not use any GitHub notification information at
        all. You have to subscribe projects through Tentacle to receive updates.
        That way your GitHub inbox remains reserved for your personal
        notification. Tentacle is just a casual way of consuming content from
        GitHub in a twitter-like manner.
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
      <div className="pt-6 text-sm italic">
        tentacle.app is not affiliated with, sponsored by, or endorsed by GitHub
        Inc.
      </div>
    </Layout>
  );
}
