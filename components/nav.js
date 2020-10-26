import { signin, signout, useSession } from 'next-auth/client'

export default function Nav() {
  const [session, loading] = useSession()

  return (
    <nav>
      {!session && (
        <a
          href={`/api/auth/signin`}
          onClick={(e) => {
            e.preventDefault()
            signin()
          }}
        >
          <button>Sign in</button>
        </a>
      )}
      {session && (
        <>
          <span className="inline-block w-10 h-10 bg-contain rounded-full"
            style={{ backgroundImage: `url(${session.user.image})` }}
          />
          <span>
            Signed in as <strong>{session.user.name}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault()
              signout()
            }}
          >
            <button>Sign out</button>
          </a>
        </>
      )}
    </nav>
  )
}
