import { signin, signout, useSession } from 'next-auth/client'
import useSWR from "swr";
import { GraphQLClient, gql } from "graphql-request";
import Item from './item.js';

async function usePR(owner, repo, token) {
  const client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `bearer ${token}`,
      },
  })

  // const after = 'Y3Vyc29yOnYyOpHOHnC2SA=='
  // const after = 'Y3Vyc29yOnYyOpHOHjeUng=='
  // pullRequests(first:5 after:"${after}") {

  const { data } = await client.rawRequest(
      gql`query {
          repository(owner:"${owner}" name:"${repo}") {
            pullRequests(last:20) {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                cursor
                node {
                  url
                  additions
                  deletions
                  state
                  authorAssociation
                  number
                  title
                  merged
                  mergedAt
                  createdAt
                  author {
                    login
                    avatarUrl
                    url
                    __typename
                  }
                  bodyHTML
                }
              }
            }
          }
        }`
    );

    return data.repository.pullRequests;
}

export default function Nav() {
  const [session, loading] = useSession()
  const { data: user } = useSWR('/api/user')
  const { data: repos } = useSWR(user ? ['octolinker', 'octolinker', user.token] : null, usePR)

  if (!session) {
      return null;
  }

  if (!repos) return 'loading...'
  
  return repos.edges.map((item, index) => (<Item key={index} {...item.node} />))
}
