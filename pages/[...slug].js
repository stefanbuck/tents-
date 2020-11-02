import { useRouter } from 'next/router'
import Layout from '../components/layout'
import List from '../components/list'

export default function IndexPage() {
  const router = useRouter()
  const slug = router.query.slug || ''
  return (
    <Layout>
      <List slug={slug} />
    </Layout>
  )
}
