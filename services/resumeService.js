import { RESUME_DATA } from '../data/resumeData';

export const ResumeService = {
  getExperience: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(RESUME_DATA.experience);
      }, 300); 
    });
  }
};