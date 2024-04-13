import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin"></div>
    </div>
  );
};

export default Spinner;
