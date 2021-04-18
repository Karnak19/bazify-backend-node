import React, { useState } from 'react';
import ResourceWrapper from './Resource/ResourceWrapper';
import resources from './resources.json';

function App() {
  const [firstOpen, setFirstOpen] = useState(true);

  if (firstOpen) {
    return (
      <div className="bg-coolGray-900">
        <div className="bg-black bg-opacity-30 h-screen grid place-items-center">
          <section className="bg-white rounded-sm shadow max-w-screen-md p-10 flex flex-col space-y-3">
            <header>
              <h1 className="text-2xl">Welcome to Bazify API !</h1>
            </header>
            <main>
              <p>
                This documentation is still WIP, please ask Basile if you need
                more information !
              </p>
            </main>
            <footer className="flex justify-end">
              <button
                onClick={() => setFirstOpen(false)}
                className="bg-teal-400 px-5 py-1 rounded-md shadow text-white text-xl font-semibold"
              >
                ok !
              </button>
            </footer>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen bg-coolGray-900 flex justify-center">
      <div className="container pt-5">
        {resources.map(({ name, routes }) => {
          return <ResourceWrapper name={name} routes={routes} />;
        })}
      </div>
    </div>
  );
}

export default App;
