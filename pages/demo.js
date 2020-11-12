import { useState } from 'react'
import Layout from '../components/layout'
import List from '../components/list'
import Filters from '../components/filters'

export default function IndexPage() {
  const [filter, setFilter] = useState('is:merged repo:backstage/backstage');

  return (
    <Layout>
      <Filters value={filter} setValue={setFilter} />
      <List filter={filter} />
    </Layout>
  )
}
