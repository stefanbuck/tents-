import Document, { Html, Head, Main, NextScript } from 'next/document';

const PLAUSIBLE_ENABLED = process.env.PLAUSIBLE_ENABLED || false;

const plausibleSnippet =
  'function() { (window.plausible.q = window.plausible.q || []).push(arguments) }';
const plausibleFunction = PLAUSIBLE_ENABLED
  ? plausibleSnippet
  : 'function() {}';

export default class NextSite extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {PLAUSIBLE_ENABLED && (
            <script
              async
              defer
              data-domain="tentacle.app"
              src="https://plausible.io/js/plausible.js"
            />
          )}
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `window.plausible = window.plausible || ${plausibleFunction}`,
            }}
          />
        </Head>
        <body className="bg-blue-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
