import React, { useState } from 'react';
import Resource from './Resource';
import resources from './resources.json';

function App() {
  return (
    <div className="min-h-screen p-5">
      {resources.map(({ name, routes }) => {
        return <Resource name={name} routes={routes} />;
      })}
    </div>
  );
}

export default App;
