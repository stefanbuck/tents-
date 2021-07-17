import Link from 'next/link';

export default function LandingContent() {
  return (
    <div className="p-6 my-4 rounded bg-blue-gray-200">
      <div>
        <h1 className="text-3xl font-semibold">Rethink how we use GitHub</h1>
        <p className="pt-6">
          Tentacle is a prototype to explore the idea of consuming GitHub issues
          and pull requests in a Twitter-like way.
        </p>
        <p className="pt-6">
          If you want to follow the evolution of a project, want to see what
          people are talking about, what is happening, and what is coming next,
          Tentacle is for you.{' '}
          <Link href="/about">
            <span className="underline cursor-pointer">Read on</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
