import { useState } from 'react';
import Layout from '@/layouts/default';
import List from '@/components/list';
import Filters from '@/components/filters';
import Hero from '@/components/hero';
import Card from '@/components/card';
import Feedback from '@/components/feedback';

export default function IndexPage() {
  const [filter, setFilter] = useState('');
  const [after, setAfter] = useState(null);

  function loadMore(pageInfo) {
    setAfter(pageInfo.endCursor);
  }

  return (
    <Layout>
      <Hero />
      <Filters
        onChange={(value) => {
          // TODO combine both sets into one
          setAfter(null);
          setFilter(value);
        }}
      />
      <List filter={filter} after={after}>
        {function ListChildren({ cursor, node, index, total, pageInfo }) {
          if (total === 0) {
            return (
              <div className="flex items-center justify-center h-32 text-gray-600">
                No results matched your filter criteria.
              </div>
            );
          }
          return (
            <div key={cursor}>
              <Card
                cursor={cursor}
                {...node} /* eslint-disable-line react/jsx-props-no-spreading */
              />
              {index === 4 ? <Feedback /> : ''}
              {pageInfo.hasNextPage && index === total - 1 ? (
                <div className="flex justify-center mt-8 mb-12 text-gray-600 text-blue-600">
                  <button type="button" onClick={() => loadMore(pageInfo)}>
                    Show more
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          );
        }}
      </List>
    </Layout>
  );
}
