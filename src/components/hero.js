import Link from 'next/link';

export default function LandingContent() {
  return (
    <div className="p-6 my-4 rounded bg-blue-gray-200">
      <div>
        <h1 className="text-3xl font-semibold">
          The Missing Timeline for GitHub
        </h1>
        <p className="pt-6">
          Tentacle is just a casual way of consuming content from GitHub in a
          twitter-like manner.
        </p>
        <p className="pt-6">
          GitHub notifications can be overwhelming, following a few projects can
          flood your inbox with updates even with the Custom Notification
          Controls that allows you to subscribe to specific events
          GitHub&hellip;{' '}
          <Link href="/about">
            <span className="underline cursor-pointer">Read on</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
