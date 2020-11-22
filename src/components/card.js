import cn from 'classnames';
import { format } from 'timeago.js';
import MergedIcon from '@/components/icons/merged';
import ClosedIcon from '@/components/icons/closed';
import CommentsIcon from '@/components/icons/comments';

function State({ type, state }) {
  const iconConfig = {
    PullRequest: {
      OPEN: MergedIcon,
      CLOSED: ClosedIcon,
      MERGED: MergedIcon,
    },
    Issue: {
      OPEN: MergedIcon,
      CLOSED: ClosedIcon,
    },
  };

  const Icon = iconConfig[type][state];

  return (
    <div
      className={cn(
        'rounded capitalize inline-block px-2 py-1 text-sm text-white',
        {
          'bg-green-700': state === 'OPEN',
          'bg-rose-800': state === 'CLOSED',
          'bg-purple-700': state === 'MERGED',
        }
      )}
    >
      <Icon /> {state.toLowerCase()}
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

export default function Card(data) {
  const {
    __typename: type,
    additions,
    author,
    bodyHTML,
    comments,
    createdAt,
    deletions,
    state,
    title,
    url,
  } = data;
  return (
    <div className="p-6 mb-4 bg-white">
      <div className="flex items-center">
        <a className="relative flex-0" href={author.url} title={author.login}>
          <img
            className="w-10 p-0.5 border-2 border-purple-600 rounded-full"
            alt={author.login}
            src={author.avatarUrl}
          />
        </a>
        <div className="pl-2 flex-">
          <a
            className="mb-1 text-sm font-bold leading-none gray-700"
            href={author.url}
            title={author.login}
          >
            {author.login}
          </a>
          <div className="text-xs font-normal leading-none">
            <span className="text-xs font-normal leading-none text-gray-400">
              {format(createdAt)}
            </span>
            <span className="pl-1 leading-none text-green-700">
              +{additions}
            </span>
            <span className="pl-1 leading-none text-rose-800">
              -{deletions}
            </span>
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
