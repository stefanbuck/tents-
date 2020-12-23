import { signin, signout, useSession } from 'next-auth/client';

export default function Nav() {
  const [session] = useSession();

  return (
    <div className="flex items-center justify-center text-white justify-items-center">
      {!session && (
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signin();
          }}
        >
          Sign in
        </a>
      )}
      {session && (
        <>
          <a
            className="mr-2"
            href="/api/auth/signout"
            onClick={(e) => {
              e.preventDefault();
              signout();
            }}
          >
            Sign out
          </a>
          <span
            className="inline-block w-10 h-10 bg-contain rounded-full"
            style={{ backgroundImage: `url(${session.user.image})` }}
          />
        </>
      )}
    </div>
  );
}
