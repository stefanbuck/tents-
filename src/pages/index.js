import { useState } from 'react';
import { useSession } from 'next-auth/client';
import Layout from '@/layouts/default';
import List from '@/components/list';
import Filters from '@/components/filters';
import Hero from '@/components/hero';
import Card from '@/components/card';
import Feedback from '@/components/feedback';

export default function IndexPage() {
  const [filter, setFilter] = useState('is:merged repo:facebook/react');
  const [session, loading] = useSession();

  if (loading) return null;

  return (
    <Layout>
      {!session && <Hero />}
      <Filters value={filter} setValue={setFilter} />
      <List filter={filter}>
        {({ cursor, node, index }) => (
          <>
            <Card
              key={cursor}
              {...node} /* eslint-disable-line react/jsx-props-no-spreading */
            />
            {index === 4 ? <Feedback /> : ''}
          </>
        )}
      </List>
    </Layout>
  );
}
