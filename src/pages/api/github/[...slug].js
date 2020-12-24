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
  }`;
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
  }`;
}

function queryBuilder({ owner, repo }) {
  return gql`query { 
    repository(name: "${repo}" owner:"${owner}") {
      ${queryPullRequest()}
      ${queryIssues()}
    }
  }`;
}

async function loadFixture({ owner, repo, res }) {
  const json = await import(`../fixtures/${owner}_${repo}.json`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(json));
}

export default async function handler(req, res) {
  const [owner, repo] = req.query.slug;
  const session = await getSession({ req });

  if (!session) {
    return loadFixture({ owner, repo, res });
  }

  const client = await connectToDatabase(process.env.NEXTAUTH_DATABASE_URL);
  const db = client.db(client.s.options.dbName);
  const collection = db.collection('accounts');

  const { accessToken } = await collection.findOne({
    userId: ObjectId(session.userId),
  });

  const endpoint = 'https://api.github.com/graphql';
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const { data, headers } = await graphQLClient.rawRequest(
    queryBuilder({ owner, repo })
  );
  // eslint-disable-next-line no-console
  console.log('Rate limit remaining', headers.get('x-ratelimit-remaining'));

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  data.repository.pullRequests.edges = data.repository.pullRequests.edges.reverse();
  return res.end(JSON.stringify(data));
}
