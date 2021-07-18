import Link from 'next/link';

export default function LandingContent() {
  return (
    <div className="p-6 mb-4 bg-white border rounded border-blue-gray-200 hero-background">
      <div>
        <h1 className="text-3xl font-semibold">Rethink how we use GitHub</h1>
        <p className="pt-6 text-gray-500">
          Tentacle is a prototype to explore the idea of consuming GitHub issues
          and pull requests in a Twitter-like way.
        </p>
        <p className="pt-6 pb-4 text-gray-500">
          <ul className="pl-6">
            <li className="list-disc">Follow the evolution of a project</li>
            <li className="list-disc">See what people are talking about </li>
            <li className="list-disc">
              Stay up to date with the latest changes
            </li>
          </ul>
        </p>
        <Link href="/about">
          <span className="text-blue-600 font-medium cursor-pointer">
            See what else it can do!
          </span>
        </Link>
      </div>
    </div>
  );
}
