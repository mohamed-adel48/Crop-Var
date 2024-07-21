// LanguageWrapper.jsx
import React from 'react';
import { LanguageProvider } from '../LanguageContext';
import SideBar from './component/sidebar';
import Navbar from './component/navbar';
import Dashboard from './pages/dashboard';

function LanguageWrapper() {
  return (
    <LanguageProvider>
      <div className="flex">
        <SideBar />
        <Navbar />
        <Dashboard />
      </div>
    </LanguageProvider>
  );
}

export default LanguageWrapper;
