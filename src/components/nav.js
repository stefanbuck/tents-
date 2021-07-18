import Link from 'next/link';

export default function Nav() {
  return (
    <div className="flex items-center gap-6 justify-center text-white justify-items-center">
      <Link href="/about">About</Link>
      <a href="https://github.com/stefanbuck/tentacle-app">GitHub</a>
    </div>
  );
}
