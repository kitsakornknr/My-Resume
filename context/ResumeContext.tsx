'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ResumeData {
  fullname: string;
  position: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  skills: string;
}

const INITIAL_DATA: ResumeData = {
  fullname: "//",
  position: "//",
  about: "//",
  email: "//",
  phone: "//",
  location: "//",
  skills: "//"
};

interface ResumeContextType {
  data: ResumeData;
  updateData: (newData: ResumeData) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateData = (newData: ResumeData) => setData(newData);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <ResumeContext.Provider value={{ data, updateData, isAuthenticated, login, logout }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};