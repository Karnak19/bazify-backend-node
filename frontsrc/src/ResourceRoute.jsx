import React from 'react';

function ResourceRoute({ verb, path }) {
  const style = {
    GET: 'border-2 border-blue-500 bg-blue-400',
    POST: 'border-2 border-green-500 bg-green-400',
    PUT: 'border-2 border-yellow-500 bg-yellow-400',
    DELETE: 'border-2 border-red-500 bg-red-400',
  };

  return (
    <div className="grid grid-cols-verb grid-rows-verb align-middle items-center space-x-2 border border-gray-300 px-5 py-2 rounded-md">
      <div className="col-start-1 col-span-1">
        <h3 className={`inline-block py-1 px-2 rounded-md ${style[verb]}`}>
          {verb}
        </h3>
      </div>
      <div className="col-start-2 col-span-2">{path}</div>
      <div className="col-start-1 row-start-2 row-span-1">
        <p>200 OK</p>
      </div>
      <div className="col-start-2 row-start-2 row-span-3">
        <p>Example response :</p>
      </div>
      <div className="col-start-3 col-span-1 row-start-2 row-span-3 p-2 h-full">
        <pre className="bg-gray-200 h-full border border-gray-400 rounded-md p-2 text-xs">
          {JSON.stringify(
            {
              id: '98b2c41d-6b12-4f9a-a0aa-dd155608ea2a',
              title: '3095 pt2',
              duration: '3:16',
              s3_link:
                'https://bazify.s3.amazonaws.com/Alpha-Wann/Dondada-mixtape/3095-pt2.mp3',
              artist: {
                name: 'Alpha Wann',
                picture: null,
              },
              album: {
                title: 'Dondada mixtape',
                picture: 'https://pbs.twimg.com/media/EpeX7DnWwAI_a8v.jpg',
              },
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}

export default ResourceRoute;
