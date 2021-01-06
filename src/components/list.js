import useSWR from 'swr';

const SLUG_REGEXP = /^[a-z0-9-]+\/[a-z0-9-]+$/i;

function isValidSlug(slug) {
  return SLUG_REGEXP.test(slug);
}

export default function List({ filter, children }) {
  const filterList = filter.split(' ');
  const slug = filterList
    .filter((item) => item.startsWith('repo:'))
    .map((item) => item.replace('repo:', ''))[0];

  const apiUrl = `/api/github?query=${filter}`;

  const { data, error } = useSWR(isValidSlug(slug) ? apiUrl : null, undefined, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  if (!isValidSlug(slug)) return null;
  if (error) return 'error';
  if (!data) return 'loading...';
  const combinedList = [...data.pullRequests, ...data.issues].sort(
    (a, b) => b.node.number - a.node.number
  );

  return combinedList.map(({ cursor, node }, index) =>
    children({ cursor, node, index })
  );
}
