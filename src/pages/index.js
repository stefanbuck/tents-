import { useState } from 'react';
import { useSession } from 'next-auth/client';
import Layout from '@/layouts/default';
import List from '@/components/list';
import Filters from '@/components/filters';
import Hero from '@/components/hero';
import Card from '@/components/card';
import Feedback from '@/components/feedback';

export default function IndexPage() {
  const [filter, setFilter] = useState('');
  const [session, loading] = useSession();

  if (loading) return null;

  return (
    <Layout>
      {!session && <Hero />}
      <Filters onChange={(value) => setFilter(value)} />
      <List filter={filter}>
        {({ cursor, node, index }) => (
          <div key={cursor}>
            <Card
              {...node} /* eslint-disable-line react/jsx-props-no-spreading */
            />
            {index === 2 ? <Feedback /> : ''}
          </div>
        )}
      </List>
    </Layout>
  );
}
