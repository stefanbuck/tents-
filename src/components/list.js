import useSWR from 'swr';
import Card from './card';

const SLUG_REGEXP = /^[a-z0-9-]+\/[a-z0-9-]+$/;
const validSlugs = [
  'backstage/backstage',
  'facebook/jest',
  'facebook/react',
  'tdeekens/flopflip',
  'vercel/next.js',
];

function isValidSlug(slug) {
  return SLUG_REGEXP.test(slug) && validSlugs.includes(slug);
}

function InvalidSlug() {
  return (
    <div>
      The Tentacle.app project is in early development stage! Therefore the{' '}
      <span className="px-1 py-0.5 font-mono text-ms text-blue-700 border border-blue-300 bg-blue-100 subpixel-antialiased bg-gray-100 rounded">
        repo
      </span>{' '}
      filter is limited to:
      <ul className="list-disc list-inside">
        {validSlugs.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function List({ filter }) {
  const filterList = filter.split(' ');
  const slug = filterList
    .filter((item) => item.startsWith('repo:'))
    .map((item) => item.replace('repo:', ''))[0];

  const { data, error } = useSWR(
    isValidSlug(slug) ? `/api/github/${slug}` : null,
    undefined,
    {
      shouldRetryOnError: false,
    }
  );

  if (!validSlugs.includes(slug)) {
    return <InvalidSlug />;
  }

  if (!isValidSlug(slug)) return null;
  if (error) return 'error';
  if (!data) return 'loading...';

  const combinedList = [
    ...data.repository.pullRequests.edges,
    ...data.repository.issues.edges,
  ].sort((a, b) => b.node.number - a.node.number);

  const list = combinedList.filter((item) => {
    const isFilter = filterList
      .filter((filterGroup) => filterGroup.startsWith('is:'))
      .map((filterValue) => filterValue.replace('is:', '').toUpperCase());

    if (!isFilter.length) {
      return true;
    }

    return isFilter.includes(item.node.state);
  });

  return (
    <>
      {list.map(({ cursor, node }) => (
        <Card
          key={cursor}
          {...node} /* eslint-disable-line react/jsx-props-no-spreading */
        />
      ))}
    </>
  );
}
