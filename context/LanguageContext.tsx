"use client";
import React, { createContext, useContext, useState } from 'react';
import { dictionaries } from '@/data/resume';

type Language = 'en' | 'th';
type LanguageContextType = {
  lang: Language;
  toggleLanguage: () => void;
  resume: typeof dictionaries['en'];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'th' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, resume: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}