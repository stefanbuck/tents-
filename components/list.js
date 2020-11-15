import useSWR from 'swr';
import Item from './item';

const SLUG_REGEXP = /^[a-z0-9-]+\/[a-z0-9-]+$/;

function isValidSlug(slug) {
  return SLUG_REGEXP.test(slug);
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
      Result: {list.length}
      {list.map(({ cursor, node }) => (
        <Item
          key={cursor}
          {...node} /* eslint-disable-line react/jsx-props-no-spreading */
        />
      ))}
    </>
  );
}
