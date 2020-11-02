import cn from 'classnames'
import { format } from 'timeago.js';

const emoji = {
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
  LAUGH: '😄',
  HOORAY: '🎉',
  CONFUSED: '😕',
  HEART: '❤',
  ROCKET: '🚀',
  EYES: '👀',
}

function Reactions({reactions}) {
  return reactions.map(({content, users: { totalCount}}) => {
    if (!totalCount) {
      return null
    }
    
    return (
      <div className="inline-block px-2 mr-1 border border-gray-300 rounded-lg">
        <Emoji type={content} />
        <span className="pl-1 text-xs">  
          {totalCount}
        </span>
      </div>
    )
  });
}

function Emoji({type}) {
  return emoji[type];
}

function DiffStat({additions, deletions}) {
  return <>
    <span className="text-green-600">+ {additions}</span>
    <span className="text-red-600">- {additions}</span>
  </>;
}

function BadgeState({type}) {
  type = type.toLowerCase();
  return (<div className={cn('rounded capitalize inline-block px-1.5 py-0.5 text-sm text-white', {
  [`bg-green-700`]: type === 'open',
  [`bg-purple-700`]: type === 'merged',
  [`bg-gray-400`]: type === 'closed',
  })}>{type}</div>)
}

function BadgeAuthorAssociation({type}) {
  type = type.toLowerCase();

  if (type === 'none') {
    return null;
  }

  return (<div className={cn('rounded capitalize inline-block px-1.5 py-0.5 text-sm text-white bg-gray-600')}>{type}</div>)
}

export default function Item({title, additions, deletions, reactionGroups, authorAssociation, number, createdAt, bodyHTML, url, author, state}) {
  const Wrapper = author.__typename === 'User' ? 'div' : 'details'

  return (
    <div className={cn("px-4 pb-4 pt-2 mb-6 bg-white border-t-8 border-b-8 rounded-lg shadow", {
      [`border-green-700`]: state === 'OPEN',
      [`border-purple-700`]: state === 'MERGED',
      [`border-gray-400`]: state === 'CLOSED',
      })}>
      <h1 className="mb-2 text-2xl">
        <a href={url}>
          {title} 
        </a>
      </h1>

      <Wrapper>
      <div className="grid grid-flow-col gap-1 auto-cols-max">
        <BadgeState type={state} />
        <BadgeAuthorAssociation type={authorAssociation} />
        <DiffStat additions={additions} deletions={deletions} />
        <a href={author.url} title={author.login}><img className="inline-block w-6 rounded-full" src={author.avatarUrl} /></a>
        { format(createdAt)}
      </div>
      <div className="pt-4 overflow-scroll markdown-body" dangerouslySetInnerHTML={{__html: bodyHTML}}></div>
      <Reactions reactions={reactionGroups} />
      </Wrapper>
    </div>
  )
}
