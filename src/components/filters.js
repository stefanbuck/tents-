import debounce from 'lodash.debounce';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Filters({ onChange }) {
  const router = useRouter();

  function getFilterFromQuery() {
    if (!router.query.q) {
      return undefined;
    }
    return decodeURIComponent(router.query.q);
  }

  const [filter, setFilter] = useState(
    getFilterFromQuery() || 'repo:facebook/react is:open is:pull-request'
  );

  const delayedSetValue = debounce((val) => {
    setFilter(val);
    onChange(val);
    router.push({ query: { q: encodeURIComponent(val) } }, undefined, {
      shallow: true,
    });
  }, 400);

  useEffect(() => {
    setFilter(getFilterFromQuery());
    onChange(filter);
  }, []);

  return (
    <div className="flex justify-between p-2 my-6 rounded bg-blue-gray-200">
      Filters
      <input
        onChange={(event) => delayedSetValue(event.target.value)}
        className="w-full px-1 ml-2 bg-white"
        defaultValue={filter}
      />
    </div>
  );
}
