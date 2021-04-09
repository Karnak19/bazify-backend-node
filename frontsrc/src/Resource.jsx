import React from 'react';
import ResourceRoute from './ResourceRoute';

function Resource({ name, routes }) {
  return (
    <div className="border-2 border-gray-500 rounded-md p-3 my-2 shadow-xl">
      <h2 className="text-3xl uppercase text-center mb-2">{name}</h2>
      <div className="flex flex-col space-y-2">
        {routes.map((route) => {
          return <ResourceRoute {...route} />;
        })}
      </div>
    </div>
  );
}

export default Resource;
