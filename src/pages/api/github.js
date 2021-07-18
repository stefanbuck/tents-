import { GraphQLClient, gql } from 'graphql-request';

function queryPullRequest(query, after) {
  const page = after ? `after:"${after}" ` : ' ';

  return `search(type:ISSUE ${page}last:20 query:"${query}") {
    pageInfo {
      endCursor,
      hasNextPage,
    }
    edges {
      cursor
      node {
        ... on PullRequest {
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
    }
  }`;
}

function queryIssues(query, after) {
  const page = after ? `after:"${after}" ` : ' ';
  return `search(type:ISSUE ${page}last:20 query:"${query}") {
    pageInfo {
      endCursor,
      hasNextPage,
    }
    edges {
      cursor
      node {
        ... on Issue {
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
    }
  }`;
}

function queryBuilder(query, after) {
  return gql`query { 
    pullRequests: ${queryPullRequest(query, after)}
    issues: ${queryIssues(query, after)}
  }`;
}

export default async function handler(req, res) {
  const { query, after } = req.query;

  const accessToken = process.env.GITHUB_TOKEN;

  const endpoint = 'https://api.github.com/graphql';
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const { data, headers } = await graphQLClient.rawRequest(
    queryBuilder(query.replace(/"/g, '\\"'), after)
  );

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('x-ratelimit-limit', headers.get('x-ratelimit-limit'));
  res.setHeader('x-ratelimit-remaining', headers.get('x-ratelimit-remaining'));
  res.setHeader('x-ratelimit-reset', headers.get('x-ratelimit-reset'));
  res.setHeader('x-ratelimit-used', headers.get('x-ratelimit-used'));
  res.setHeader(
    'Cache-Control',
    'public, max-age=300, s-maxage=300, stale-while-revalidate=3600'
  );

  return res.end(
    JSON.stringify({
      // Search endpoint returns the same pageInfo for issues and pullrequests
      pageInfo: data.pullRequests.pageInfo,
      pullRequests: data.pullRequests.edges.filter((item) => !!item.node?.url),
      issues: data.issues.edges.filter((item) => !!item.node?.url),
    })
  );
}
