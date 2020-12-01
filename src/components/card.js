import cn from 'classnames';
import { format } from 'timeago.js';
import MergedIcon from '@/components/icons/merge';
import PullRequestIcon from '@/components/icons/pullrequest';
import IssueOpenedIcon from '@/components/icons/issue-closed';
import IssueClosedIcon from '@/components/icons/issue-opened';
import CommentsIcon from '@/components/icons/comments';

function State({ type, state }) {
  const iconConfig = {
    PullRequest: {
      OPEN: PullRequestIcon,
      CLOSED: PullRequestIcon,
      MERGED: MergedIcon,
    },
    Issue: {
      OPEN: IssueOpenedIcon,
      CLOSED: IssueClosedIcon,
    },
  };

  const Icon = iconConfig[type][state];

  return (
    <div
      className={cn(
        'rounded flex items-center capitalize inline-block px-3 py-1 text-sm text-white',
        {
          'bg-green-700': state === 'OPEN',
          'bg-rose-800': state === 'CLOSED',
          'bg-purple-700': state === 'MERGED',
        }
      )}
    >
      <Icon />
      <span className="pl-2">{state.toLowerCase()}</span>
    </div>
  );
}

function Comments({ totalCount, url }) {
  return (
    <div className="inline-block mr-2">
      <CommentsIcon />
      <a href={url}>
        <span className="pl-1 text-xs">
          {totalCount} Comment{totalCount === 1 ? '' : 's'}
        </span>
      </a>
    </div>
  );
}

function DiffStats({ additions, deletions }) {
  return (
    <>
      <span className="pl-1 leading-none text-green-700">+{additions}</span>
      <span className="pl-1 leading-none text-rose-800">-{deletions}</span>
    </>
  );
}

export default function Card(data) {
  const {
    __typename: type,
    additions,
    author,
    authorAssociation,
    bodyHTML,
    comments,
    createdAt,
    deletions,
    state,
    title,
    url,
  } = data;
  return (
    <div className="p-6 mb-4 bg-white border rounded border-blue-gray-200">
      <div className="flex items-center">
        <a
          className="relative flex-shrink-0 flex-0"
          href={author.url}
          title={author.login}
        >
          <img
            width="40"
            height="40"
            className="w-10 h-10 p-0.5 border-2 border-blue-gray-400 rounded-full"
            loading="lazy"
            alt=""
            src={`${author.avatarUrl}&s=80`}
          />
        </a>
        <div className="flex flex-col pl-2">
          <div className="flex grid content-center justify-start grid-flow-col gap-1 mb-2">
            <a
              className="block text-sm font-bold leading-none gray-700"
              href={author.url}
              title={author.login}
            >
              {author.login}
            </a>
            <div className="-my-0.5 py-0.5 px-1 text-xs leading-none text-gray-700 bg-gray-100 border border-gray-200 rounded-sm">
              {authorAssociation}
            </div>
          </div>
          <div className="text-xs font-normal leading-none">
            <span className="text-xs font-normal leading-none text-gray-400">
              {format(createdAt)}
            </span>
            {type === 'PullRequest' && (
              <DiffStats additions={additions} deletions={deletions} />
            )}
          </div>
        </div>
      </div>
      <div className="pt-4">
        <a href={url}>
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        </a>
      </div>
      <div
        className="pt-4 font-normal break-words markdown-body"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{
          __html: bodyHTML,
        }}
      />
      <div className="grid justify-start grid-flow-col gap-4 pt-4">
        <State type={type} state={state} />
        <Comments totalCount={comments.totalCount} url={url} />
      </div>
    </div>
  );
}
