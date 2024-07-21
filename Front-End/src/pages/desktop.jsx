import React, { useState, useEffect } from 'react';

const DesktopOnly = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-800 font-sans p-4">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Notice</h1>
          <p className="text-lg">
            This application is only available on desktop devices.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DesktopOnly;
