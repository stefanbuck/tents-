import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import List from '../components/list'
import Filters from '../components/filters'

export default function IndexPage() {
  const router = useRouter()
  const [filter, setFilter] = useState('is:merged');

  const slug = router.query.slug?.join('/') || ''
  return (
    <Layout>
      <Filters value={filter} setValue={setFilter} />
      <List slug={slug} filter={filter} />
    </Layout>
  )
}
