import React from 'react';

function Path({ path, setOpened }) {
  return (
    <div
      className="col-start-2 col-span-2 cursor-pointer flex items-center font-light tracking-wider text-teal-100"
      onClick={() => setOpened((o) => !o)}
    >
      /api/v1{path}
    </div>
  );
}

export default Path;
