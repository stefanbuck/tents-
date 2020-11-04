import useSWR from "swr";
import { useState } from 'react';
import Item from './item.js';
import Filters from './filters.js';

export default function List({slug}) {
  const [filter, setFilter] = useState('is:merged');

  const { data } = useSWR(slug ? `/api/github/${slug}`: null)

  if (!data) return 'loading...'

  const filterList = filter.split(' ');

  const list = data.repository.pullRequests.edges.filter(item => {
    const isFilter = filterList.filter(item => item.startsWith('is:')).map(item => item.replace('is:', '').toUpperCase())

    if (!isFilter.length) {
      return true;
    }

    return isFilter.includes(item.node.state);
  });

  return (
    <>
      <Filters value={filter} setValue={setFilter} />
      Result: {list.length}
      {list.map(({cursor, node}) => (<Item key={cursor} {...node} />))}
    </>
  )
  
}
