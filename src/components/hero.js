export default function LandingContent() {
  return (
    <div className="p-6 my-4 rounded bg-blue-gray-200">
      <div>
        <h1 className="text-3xl font-semibold">
          The Missing Timeline for GitHub
        </h1>
        <p className="pt-6">
          GitHub notifications can be overwhelming especially if you follow or
          own a high-traffic project. When I started to follow a few projects
          more closely my notification inbox was flooded with updates. Back
          then, notifications options were quite limited. End of last year
          GitHub announced{' '}
          <a
            className="underline"
            href="https://github.blog/changelog/2020-11-20-custom-notification-controls/"
          >
            Custom Notification Controls
          </a>{' '}
          that allows you subscribe to specific events. However, the underlying
          issue remains.
        </p>
        <p className="pt-6">
          The amount of information you get in your notification inbox is
          limited to a few metadata like title, author, date, and event type. To
          get additional information like the description, you have to open
          every single notification. Wouldn&apos;t it be helpful to get a better
          summary in a timeline-like manner?
        </p>
        <p className="pt-6">
          The Tentacle project does not aim to replace the GitHub notification
          center. In fact it does not use any GitHub notification information at
          all. You have to subscribe projects through Tentacle to receive
          updates. That way your GitHub inbox remains reserved for your personal
          notification. Tentacle is just a casual way of consuming content from
          GitHub in a twitter-like manner.
        </p>
        <p className="pt-6">
          You like the idea? Tentacle is open source and{' '}
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
      </div>
    </div>
  );
}
