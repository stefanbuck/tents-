import { GraphQLClient, gql } from 'graphql-request';
import { getSession } from 'next-auth/client';
import { MongoClient, ObjectId } from 'mongodb';

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await MongoClient.connect(uri, { useNewUrlParser: true });
  cachedDb = db;
  return cachedDb;
}

function queryPullRequest(query) {
  return `search(type:ISSUE last:20 query:"${query}") {
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

function queryIssues(query) {
  return `search(type:ISSUE last:20 query:"${query}") {
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

function queryBuilder(query) {
  return gql`query { 
    pullRequests: ${queryPullRequest(query)}
    issues: ${queryIssues(query)}
  }`;
}

export default async function handler(req, res) {
  const { query } = req.query;
  const session = await getSession({ req });

  let accessToken;

  if (session) {
    const client = await connectToDatabase(process.env.NEXTAUTH_DATABASE_URL);
    const db = client.db(client.s.options.dbName);
    const collection = db.collection('accounts');

    const response = await collection.findOne({
      userId: ObjectId(session.userId),
    });

    accessToken = response.accessToken;
  } else {
    accessToken = process.env.GITHUB_TOKEN;
  }

  const endpoint = 'https://api.github.com/graphql';
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const { data, headers } = await graphQLClient.rawRequest(
    queryBuilder(query.replace(/"/g, '\\"'))
  );

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('x-ratelimit-limit', headers.get('x-ratelimit-limit'));
  res.setHeader('x-ratelimit-remaining', headers.get('x-ratelimit-remaining'));
  res.setHeader('x-ratelimit-reset', headers.get('x-ratelimit-reset'));
  res.setHeader('x-ratelimit-used', headers.get('x-ratelimit-used'));
  res.setHeader(
    'Cache-Control',
    'public, max-age=300, s-maxage=300, stale-while-revalidate'
  );

  return res.end(
    JSON.stringify({
      pullRequests: data.pullRequests.edges.filter((item) => !!item.node?.url),
      issues: data.issues.edges.filter((item) => !!item.node?.url),
    })
  );
}
