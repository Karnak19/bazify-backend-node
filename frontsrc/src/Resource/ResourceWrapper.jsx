import React from 'react';
import ResourceRoute from './ResourceRoute';

function ResourceWrapper({ name, routes }) {
  return (
    <div className=" bg-coolGray-800 border border-coolGray-500 rounded-md p-3 my-10 shadow">
      <h2 className="text-3xl uppercase text-center mb-2 font-semibold text-teal-200">
        {name}
      </h2>
      <div className="flex flex-col space-y-2">
        {routes.map((route) => {
          return <ResourceRoute {...route} />;
        })}
      </div>
    </div>
  );
}

export default ResourceWrapper;
