import useSWR from "swr";
import Item from './item.js';

export default function List({slug}) {
  const { data } = useSWR(slug ? `/api/github/${slug}`: null)

  if (!data) return 'loading...'
  
  return data.repository.pullRequests.edges.map(({cursor, node}) => (<Item key={cursor} {...node} />))
}
