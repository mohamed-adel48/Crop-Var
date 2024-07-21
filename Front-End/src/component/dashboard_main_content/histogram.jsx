// Histogram.js
import React from 'react';

const Histogram = ({ data }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Crop Statistics - Monthly Histogram</h2>
      <div className="flex space-x-2">
        {months.map((month, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-blue-500 h-full" style={{ height: `${data[index]}px` }}></div>
            <div className="text-xs mt-2">{month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Histogram;
