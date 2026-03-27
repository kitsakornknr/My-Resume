'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Profile {
  name: string;
  role: string;
  about: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  availability: string;
  btnWorkText: string;
  btnContactText: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  category: string;
  label?: string;
}

export interface ResumeData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
}

const INITIAL_DATA: ResumeData = {
  profile: {
    name: "Kitsakorn",
    role: "Full Stack Developer",
    about: "Passion for building digital experiences with modern web technologies.",
    email: "contact@email.com",
    phone: "081-234-5678",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    availability: "Available for work",
    btnWorkText: "View My Work",
    btnContactText: "Contact Me"
  },
  skills: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Prisma", category: "Backend" },
    { name: "VS Code", category: "Tools" },
  ],
  projects: [
    {
      title: "Portfolio V1",
      description: "My personal portfolio website using Next.js and Tailwind.",
      link: "https://google.com",
      tags: ["Next.js", "React"],
      category: "Flagship Projects",
      label: "New"
    }
  ]
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
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
};