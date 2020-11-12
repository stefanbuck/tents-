import { GraphQLClient, gql } from 'graphql-request'

function queryPullRequest() {
  return `pullRequests (last: 20) {
    edges {
      cursor
      node {
        __typename
        additions
        authorAssociation
        bodyHTML
        createdAt
        deletions
        merged
        mergedAt
        number
        state
        title
        url
        comments {
          totalCount
        }
        reactionGroups {
          content
          users {
            totalCount
          }
        }
        author {
          login
          avatarUrl
          url
          __typename
        }
      }
    }
  }`
}

function queryIssues() {
  return `issues (last: 20) {
    edges {
      cursor
      node {
        __typename
        authorAssociation
        bodyHTML
        createdAt
        number
        state
        title
        url
        comments {
          totalCount
        }
        reactionGroups {
          content
          users {
            totalCount
          }
        }
        author {
          login
          avatarUrl
          url
          __typename
        }
      }
    }
  }`
}

function queryBuilder({owner, repo}) {
  return gql`query { 
    repository(name: "${repo}" owner:"${owner}") {
      ${queryPullRequest()}
      ${queryIssues()}
    }
  }`
}

async function loadFixture({owner, repo, res}) {
  const json = await import(`../fixtures/${owner}_${repo}.json`)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(json));
}

export default async function handler(req, res) {
  const [owner, repo] = req.query.slug;

  return loadFixture({owner, repo, res});

  const endpoint = 'https://api.github.com/graphql'
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })

  const data = await graphQLClient.request(queryBuilder({owner, repo}))
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  data.repository.pullRequests.edges = data.repository.pullRequests.edges.reverse();
  res.end(JSON.stringify(data))
}