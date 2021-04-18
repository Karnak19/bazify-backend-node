import React from 'react';

function Verb({ verb, setOpened }) {
  const style = {
    GET: 'border-2 border-indigo-500 bg-indigo-400',
    POST: 'border-2 border-emerald-500 bg-emerald-400',
    PUT: 'border-2 border-amber-500 bg-amber-400',
    DELETE: 'border-2 border-fuchsia-500 bg-fuchsia-400',
  };

  return (
    <div
      className="col-start-1 col-span-1 cursor-pointer"
      onClick={() => setOpened((o) => !o)}
    >
      <h3
        className={`text-black inline-block py-1 px-2 rounded-md text-xl font-medium ${style[verb]}`}
      >
        {verb}
      </h3>
    </div>
  );
}

export default Verb;
