import { signin, signout, useSession } from 'next-auth/client'
import axios from "axios";
import { GraphQLClient, gql } from "graphql-request";
import {
  useQuery,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import cn from 'classnames'

const badgeConfig = {
  OPEN: 'Open',
  MERGED: 'Merged',
  CLOSED: 'Closed',
}

function Badge({state}) {
  const label = badgeConfig[state];
  return (<div className={cn('rounded inline-block px-1.5 py-0.5 text-sm text-white', {
  [`bg-green-700`]: state === 'OPEN',
  [`bg-purple-700`]: state === 'MERGED',
  [`bg-gray-400`]: state === 'CLOSED',
  })}>{label}</div>)
}
function Item({title, number, createdAt, bodyHTML, url, author, state}) {
  const [color] = badgeConfig[state];
  const Wrapper = author.__typename === 'User' ? 'div' : 'details'

  return (
    <div className={cn("px-4 pb-4 pt-2 mb-6 bg-white border-t-8 rounded-lg shadow", {
      [`border-green-700`]: state === 'OPEN',
      [`border-purple-700`]: state === 'MERGED',
      [`border-gray-400`]: state === 'CLOSED',
      })}>
      <h1 className="mb-4 text-2xl">
        <a href={url}>
          {title} 
        </a>
      </h1>

      <Wrapper>
      <div>
        <Badge state={state} />
        {" "}<a href={author.url}>{author.login}</a>
      </div>
      <div className="pt-4 overflow-scroll markdown-body" dangerouslySetInnerHTML={{__html: bodyHTML}}></div>
      </Wrapper>
    </div>
  )
}

const queryCache = new QueryCache();

function useUser() {
    return useQuery("user", async () => {
      const { data } = await axios.get(
        "/api/user"
      );
      return data;
    });
}

function usePR(token) {
  const [owner, repo] = ['facebook', 'jest'];

  const client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `bearer ${token}`,
      },
    })

  return useQuery("pr", async () => {
    const { data } = await client.rawRequest(
      gql`query {
          repository(name: "${repo}" owner:"${owner}") {
            pullRequests (last:3 ) {
              edges {
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
    return data;
  });
}

function CurrentUser({ setPostId }) {
    const cache = useQueryCache();
    const { status, data, error, isFetching } = useUser();
  
    return (
      <div>
        <div>
          {status === "loading" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : (
            <Posts token={data.token} />
          )}
        </div>
      </div>
    );
  }

  function Posts({ token }) {
    const cache = useQueryCache();
    const { status, data, error, isFetching } = usePR(token);

    return (
      <div>
        <div>
          {status === "loading" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : (
            data.repository.pullRequests.edges.map((item, index) => (<Item key={index} {...item.node} />))
          )}
        </div>
      </div>
    );
  }

export default function Nav() {
  const [session, loading] = useSession()

  if (!session) {
      return null;
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
        <CurrentUser />
    </ReactQueryCacheProvider>
  )
}
