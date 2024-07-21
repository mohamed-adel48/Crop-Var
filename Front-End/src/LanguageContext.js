// LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [activeLink, setActiveLink] = useState(null);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const getText = (enText, arText) => (language === 'en' ? enText : arText);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, getText, activeLink, setActiveLink }}>
      {children}
    </LanguageContext.Provider>
  );
};
