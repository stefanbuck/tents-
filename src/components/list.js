import useSWR from 'swr';
import useDebounce from '../utils/hooks/useDebounce';

export default function List({ filter = '', children, after }) {
  const debouncedSearch = useDebounce(filter, 400);
  const afterQuery = after ? `&after=${after}` : '';
  const apiUrl = `/api/github?query=${debouncedSearch}${afterQuery}`;

  const { data, error } = useSWR(debouncedSearch ? apiUrl : null, undefined, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  if (!filter) return null;
  if (error) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-600">
        {error}
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-600">
        loading&hellip;
      </div>
    );
  }
  const combinedList = [...data.pullRequests, ...data.issues].sort(
    (a, b) => b.node.number - a.node.number
  );

  if (!combinedList.length) {
    return children({ total: 0 });
  }

  return combinedList.map(({ cursor, node }, index) =>
    children({
      cursor,
      node,
      index,
      total: combinedList.length,
      pageInfo: data.pageInfo,
    })
  );
}
