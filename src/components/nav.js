import Link from 'next/link';

export default function Nav() {
  return (
    <div className="flex items-center justify-center text-white justify-items-center">
      <Link href="/login">Sign in</Link>
    </div>
  );
}
