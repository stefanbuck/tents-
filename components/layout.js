import useSWR from "swr";
import Item from './item.js';

export default function List({children}) {
    return (<div>
        <div className="px-6">
            <h1 className="mt-3 mb-6 text-5xl text-center text-accent-1">
            Tentacle.app
            </h1>
            {children}
        </div>
    </div>)
}
