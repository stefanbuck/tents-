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

export default function Item({title, number, createdAt, bodyHTML, url, author, state}) {
  const [color] = badgeConfig[state];
  const Wrapper = author.__typename === 'User' ? 'div' : 'details'

  return (
    <div className={cn("px-4 pb-4 pt-2 mb-6 bg-white border-t-8 border-b-8 rounded-lg shadow", {
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
