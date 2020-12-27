import { useState } from 'react';
import { useSession } from 'next-auth/client';
import Layout from '@/layouts/default';
import List from '@/components/list';
import Filters from '@/components/filters';
import Hero from '@/components/hero';

export default function IndexPage() {
  const [filter, setFilter] = useState('is:merged repo:backstage/backstage');
  const [session, loading] = useSession();

  if (loading) return null;

  return (
    <Layout>
      {!session && <Hero />}
      <Filters value={filter} setValue={setFilter} />
      <List filter={filter} />
    </Layout>
  );
}
