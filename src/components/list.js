import useSWR from 'swr';
import useDebounce from '../utils/hooks/useDebounce';

const SLUG_REGEXP = /^[a-z0-9-]+\/[a-z0-9-]+$/i;

function isValidSlug(slug) {
  return SLUG_REGEXP.test(slug);
}

export default function List({ filter = '', children }) {
  const debouncedSearch = useDebounce(filter, 400);

  const filterList = filter.split(' ');
  const slug = filterList
    .filter((item) => item.startsWith('repo:'))
    .map((item) => item.replace('repo:', ''))[0];

  const apiUrl = `/api/github?query=${debouncedSearch}`;

  const { data, error } = useSWR(
    isValidSlug(slug) && debouncedSearch ? apiUrl : null,
    undefined,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  if (!isValidSlug(slug)) return null;
  if (error) return 'error';
  if (!data) return 'loading...';
  const combinedList = [...data.pullRequests, ...data.issues].sort(
    (a, b) => b.node.number - a.node.number
  );

  if (!combinedList.length) {
    return children({ total: 0 });
  }

  return combinedList.map(({ cursor, node }, index) =>
    children({ cursor, node, index, total: combinedList.length })
  );
}
