import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

const StartComponent = () => {
  const { setSelectpdf, setShowStartComponent, showStartComponent } = useContext(AppContext);

  const visibility = () => {
    setSelectpdf(true);
    setShowStartComponent(!showStartComponent);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg ">
      <p className="text-2xl font-semibold text-gray-800 mb-6">Start Your memory test!</p>
      <button
        onClick={visibility}
        className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      >
        File Upload
      </button>
    </div>
  );
};

export default StartComponent;
