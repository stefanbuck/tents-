import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
    setFilter(getFilterFromQuery());
    onChange(filter);
  }, []);

  const examples = [
    'repo:backstage/backstage is:pr is:open',
    'repo:backstage/backstage author:Rugvip',
    'repo:backstage/backstage label:"help wanted"',
    'repo:backstage/backstage assignee:freben updated:>2021-01-01',
  ];

  return (
    <div className="p-2 my-6 rounded bg-blue-gray-200">
      <div className="flex justify-between">
        Filters
        <input
          onChange={(event) => setFilterString(event.target.value)}
          className="w-full px-1 ml-2 bg-white"
          value={filter}
        />
      </div>
      <details className="text-sm">
        <summary className="italic underline">Examples</summary>
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
