"use client";
import React, { useState, useEffect } from 'react';
import { ResumeService } from '../../services/resumeService';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  type: string;
  details: string[];
}

const Experience = () => {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ResumeService.getExperience();
        
        setExperience(data);
      } catch (error) {
        console.error("Error fetching experience data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading Experience...</div>;
  }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold border-b pb-2 mb-6 text-gray-800">
        Experience
      </h2>

      <div className="space-y-8">
        {experience.map((exp) => (
          <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200 hover:border-blue-500 transition-colors duration-300">
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 className="text-lg font-bold text-gray-900">
                {exp.role}
              </h3>
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {exp.period}
              </span>
            </div>

            <div className="mb-3">
              <span className="text-md font-semibold text-blue-600">
                {exp.company}
              </span>
              <span className="text-xs text-gray-400 ml-2">
                ({exp.type})
              </span>
            </div>

            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-sm leading-relaxed">
              {exp.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;