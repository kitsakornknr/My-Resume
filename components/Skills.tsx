"use client";
import { useLanguage } from '@/context/LanguageContext';
import { motion } from "framer-motion";

export default function Skills() {
  const { resume } = useLanguage();
  
  const categories = [
    resume.skills.items.frontend,
    resume.skills.items.backend,
    resume.skills.items.tools,
    resume.skills.items.automation
  ];

  const categoryTitles = [
    resume.skills.frontend,
    resume.skills.backend,
    resume.skills.tools,
    resume.skills.automation
  ];

  return (
    <section className="py-20 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">{resume.skills.title}</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            {resume.skills.desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                  <cat.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{categoryTitles[idx]}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-black/50 border border-white/10 rounded-full text-xs text-gray-300 font-mono hover:text-white hover:border-blue-500/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}