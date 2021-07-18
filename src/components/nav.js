import Link from 'next/link';

export default function Nav() {
  return (
    <div className="flex items-center gap-6 justify-center text-white justify-items-center">
      <Link href="/about">About</Link>
      <Link href="/login">Sign in</Link>
    </div>
  );
}
