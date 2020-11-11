import cn from 'classnames'
import { useState } from 'react';
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
  return reactions.map(({content, users: { totalCount}}, index) => {
    if (!totalCount) {
      return null
    }
    
    return (
      <div key={index} className="inline-block px-2 mr-1 border border-gray-300 rounded-lg">
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

function Comments({totalCount}) {
  return (<div className="inline-block mr-2">
    <svg className="inline-block w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
    <span className="pl-1 text-xs">  
      {totalCount}
    </span>
  </div>)
}

function DiffStat({additions, deletions}) {
  return <div className="grid grid-flow-col">
    <span className="px-1.5 text-sm leading-6 text-white bg-green-500 rounded-l">+{additions}</span>
    <span className="px-1.5 text-sm leading-6 text-white bg-red-500 rounded-r">-{deletions}</span>
  </div>;
}

function BadgeState({type}) {
  type = type.toLowerCase();
  return (<div className={cn('rounded capitalize inline-block px-1.5 py-0.5 text-sm text-white', {
  [`bg-green-700`]: type === 'open',
  [`bg-purple-700`]: type === 'merged',
  [`bg-gray-400`]: type === 'closed',
  })}>{type}</div>)
}

function BadgeType({type}) {
  type = type.toLowerCase();
  return (<div className='rounded capitalize inline-block px-1.5 py-0.5 text-sm text-white bg-gray-600'>{type}</div>)
}

function BadgeAuthorAssociation({type}) {
  type = type.toLowerCase();

  if (type === 'none') {
    return null;
  }

  return (<div className={cn('rounded capitalize inline-block px-1.5 py-0.5 text-sm text-white bg-gray-600')}>{type}</div>)
}

function Body({data}) {
  const {__typename, title, comments, additions, deletions, reactionGroups, authorAssociation, number, createdAt, bodyHTML, url, author, state} = data;
  return (<>
  <div className="grid grid-flow-col gap-1 auto-cols-max">
  <BadgeType type={__typename} />
  <BadgeState type={state} />
  <BadgeAuthorAssociation type={authorAssociation} />
  {__typename === 'PullRequest' && <DiffStat additions={additions} deletions={deletions} />}
  <a href={author.url} title={author.login}><img className="inline-block w-6 rounded-full" src={author.avatarUrl} /></a>
  { format(createdAt)}
</div>
<div className="pt-4 break-words markdown-body" dangerouslySetInnerHTML={{__html: bodyHTML}}></div>
<Comments totalCount={comments.totalCount} />
<Reactions reactions={reactionGroups} />
</>)
}

function Expander({children, open}) {
  const [isOpen, setOpen] = useState(open);

  if (isOpen) {
    return children
  }

  return (
    <div className="text-center">
      <button className="text-blue-500" onClick={() => setOpen(!isOpen)}>
        Show Bot pull request
      </button>
    </div>
  )
}

export default function Item(data) {
  const isUser = data.author.__typename === 'User'

  return (
    <div className={cn("px-4 pb-4 pt-2 mb-6 bg-white border-t-8 border-b-8 rounded-lg shadow", {
      [`border-green-700`]: data.state === 'OPEN',
      [`border-purple-700`]: data.state === 'MERGED',
      [`border-gray-400`]: data.state === 'CLOSED',
      })}>
      <h1 className="mb-2 text-2xl">
        <a href={data.url}>
          {data.title} 
        </a>
      </h1>

    <Expander open={isUser}><Body data={data} /></Expander>
    </div>
  )
}
