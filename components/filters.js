import { useState } from 'react';

export default function Filters({setValue, value}) {
    return (<div className="flex justify-between p-2 my-8 bg-gray-200 rounded">
      Filters
      <input onChange={event => setValue(event.target.value)} className="w-full px-1 ml-2" defaultValue={value} />
    </div>)
}
