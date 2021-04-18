import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import Verb from '../Verb';
import Path from '../Path';

function ResourceRoute({ verb, path, example }) {
  const [opened, setOpened] = useState(false);

  return (
    <div
      className={`group grid grid-cols-verb space-x-2 px-5 py-2 rounded-md shadow border border-coolGray-500 ${
        opened ? 'grid-rows-verb' : 'grid-rows-1'
      }`}
    >
      <Verb verb={verb} setOpened={setOpened} />
      <Path path={path} setOpened={setOpened} />
      <div className="col-start-4 col-span-1">
        <ChevronDownIcon className="h-12 drop-shadow-sm shadow rounded-full cursor-pointer bg-teal-700 group-hover:bg-teal-400" />
      </div>
      <Content opened={opened} example={example} />
    </div>
  );
}

function Content({ opened, example }) {
  return (
    <>
      <div
        className={`col-start-1 row-start-2 row-span-1 ${
          opened ? 'block' : 'hidden'
        }`}
      >
        <p className="text-teal-100">200 OK</p>
      </div>
      <div
        className={`col-start-2 row-start-2 row-span-3 ${
          opened ? 'block' : 'hidden'
        }`}
      >
        <p className="text-teal-100">Example response :</p>
      </div>
      <div
        className={`bg-coolGray-900 border border-coolGray-500 rounded-md text-xs text-teal-100 col-start-3 col-span-2 row-start-2 row-span-3 p-2 h-full overflow-x-scroll ${
          opened ? 'block' : 'hidden'
        }`}
      >
        <pre className="h-full p-2">{JSON.stringify(example, null, 2)}</pre>
      </div>
    </>
  );
}

export default ResourceRoute;
