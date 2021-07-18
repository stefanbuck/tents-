import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Tips() {
  const tips = [
    'Follow long discussions with <code>`comments:>50`</code>',
    '<code>`no:milestone`</code> will show everything without a milestone',
    'Find everything you created by <code>`author:octocat`</code>',
    'Adding <code>`no:label`</code> will show everything without a label',
    'Ears burning? Get @octocat mentions with <code>`mentions:octocat`</code>',
    'Exclude your own issues with <code>`-author:octocat`</code>',
    "Find all pull requests that aren't related to any open issues with <code>`-linked:issue`</code>.",
    'Filter pull requests by the default branch with <code>`base:main`</code>',
    'Exclude everything labeled bug with <code>`-label:bug`</code>',
    'Add <code>`no:assignee`</code> to see everything that’s not assigned',
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
    <div className="mt-4 mb-2 ml-1 text-sm text-gray-500 flex">
      <div
        className="flex-1 tips" /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{
          __html: tips[index],
        }}
      />
      <div className="">
        <button
          type="button"
          className="text-blue-600 font-medium"
          onClick={() => showNext()}
        >
          Show another tip
        </button>
      </div>
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
    <div className="p-2 my-4">
      <input
        onChange={(event) => setFilterString(event.target.value)}
        className="w-full p-3 bg-white border-blue-gray-200 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        value={filter}
      />

      <Tips />
      <details className="text-sm">
        <summary className="cursor-pointer text-blue-600 font-semibold">
          Examples
        </summary>
        <ul className="truncate list-disc list-inside ml-2">
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
