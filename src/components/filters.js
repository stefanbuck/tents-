import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Tips() {
  const tips = [
    'Follow long discussions with `comments:>50`.',
    '`no:milestone` will show everything without a milestone.',
    'Find everything you created by `author:octocat`.',
    'Adding `no:label` will show everything without a label.',
    'Ears burning? Get @octocat mentions with `mentions:octocat`.',
    'Exclude your own issues with `-author:octocat`.',
    "Find all pull requests that aren't related to any open issues with `-linked:issue`.",
    'Filter pull requests by the default branch with `base:main`.',
    'Exclude everything labeled bug with `-label:bug`.',
    'Add `no:assignee` to see everything that’s not assigned.',
  ];

  const [index, setIndex] = useState(0);
  function showNext() {
    if (index + 1 >= tips.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <div className="mt-1 mb-4 ml-1 text-xs text-gray-500">
      <button
        type="button"
        className="text-blue-600"
        onClick={() => showNext()}
      >
        Show another tip:
      </button>{' '}
      {tips[index]}
    </div>
  );
}

export default function Filters({ onChange }) {
  const router = useRouter();

  function getFilterFromQuery() {
    if (!router.query.q) {
      return '';
    }
    return decodeURIComponent(router.query.q);
  }

  const [filter, setFilter] = useState(
    getFilterFromQuery() || 'repo:backstage/backstage is:pr is:merged'
  );

  function setFilterString(val) {
    setFilter(val);
    onChange(val);
    router.push({ query: { q: encodeURIComponent(val) } }, undefined, {
      shallow: true,
    });
  }

  useEffect(() => {
    const val = getFilterFromQuery();
    if (val) {
      setFilter(val);
    }
    onChange(filter);
  }, []);

  const examples = [
    'is:pr is:open repo:backstage/backstage',
    'author:Rugvip repo:backstage/backstage',
    'label:"help wanted" repo:backstage/backstage',
    'assignee:freben updated:>2021-01-01 repo:backstage/backstage',
  ];

  return (
    <div className="p-2 my-6 rounded bg-blue-gray-200">
      <input
        onChange={(event) => setFilterString(event.target.value)}
        className="w-full px-2 py-1 bg-white"
        value={filter}
      />

      <Tips />
      <details className="text-sm">
        <summary className="italic underline cursor-pointer">Examples</summary>
        <ul className="truncate list-disc list-inside">
          {examples.map((example, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <button
                type="button"
                className="py-1 cursor-pointer md:py-0.5 hover:text-gray-500"
                onClick={() => {
                  setFilterString(`${example}`);
                }}
              >
                {example}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
