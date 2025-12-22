"use client";
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight, Globe, ShieldCheck, Code2, Star, Layers, Activity, Tag } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from './Motion';

export default function Projects() {
  const { resume } = useLanguage();
  
  type ProjectType = typeof resume.projects[0] & { label?: string };

  const flagship = resume.projects.filter(p => p.category === "Flagship Projects");
  const ongoing = resume.projects.filter(p => p.category === "Ongoing Maintenance");
  const ownership = resume.projects.filter(p => p.category === "Full Ownership Projects");
  const internal = resume.projects.filter(p => p.category === "Internal Projects");

  const FlagshipCard = ({ project }: { project: ProjectType }) => (
    <a href={project.link} target="_blank" className="group block h-full">
      {}
      <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col overflow-hidden">
        
        {}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-900/10 rounded-full blur-[80px] group-hover:bg-blue-800/20 transition-all" />

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div className="flex flex-wrap gap-3">
                    <div className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-bold text-yellow-500 flex items-center gap-2">
                        <Star size={12} fill="currentColor" /> Flagship
                    </div>

                    {project.label && (
                        <div className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-xs font-bold text-sky-400 flex items-center gap-2">
                            <Tag size={12} /> {project.label}
                        </div>
                    )}
                </div>

                {}
                <div className="p-2 bg-white/5 rounded-full text-gray-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    <ArrowUpRight size={20} />
                </div>
            </div>

            {}
            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors leading-tight">
                {project.title}
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 flex-grow">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-mono group-hover:border-blue-500/30 transition-colors">
                        {t}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </a>
  );

  const NotableCard = ({ project, icon: Icon }: { project: ProjectType, icon: any }) => (
    <a href={project.link} target="_blank" className="group block h-full">
      {}
      <div className="h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 hover:bg-[#111] transition-all duration-300 flex flex-col relative overflow-hidden">
          
          <div className="flex justify-between items-start mb-4 relative z-10">
             {}
             <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
               <Icon size={20} />
             </div>
             <ArrowUpRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
          </div>
          
          {}
          <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors relative z-10">{project.title}</h4>
          <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow relative z-10 leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto relative z-10">
             {project.tags.slice(0, 3).map(t => (
               <span key={t} className="text-[11px] font-mono text-gray-500 bg-black/50 px-2 py-1 rounded border border-white/5">
                 {t}
               </span>
             ))}
          </div>
      </div>
    </a>
  );

  return (
    <section id="projects" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
             {}
             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
               {resume.section.featured.split(' ')[0]} <span className="text-blue-500">{resume.section.featured.split(' ').slice(1).join(' ')}</span>
             </h2>
             <p className="text-gray-400 text-lg max-w-2xl">
               {resume.section.featured_desc}
             </p>
          </div>
        </FadeUp>

        {}
        <div className="mb-24">
           <StaggerContainer>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                 {flagship.map((p, i) => (
                   <StaggerItem key={i}>
                      <FlagshipCard project={p} />
                   </StaggerItem>
                 ))}
              </div>
           </StaggerContainer>
        </div>

        {}
        <FadeUp>
           <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              {}
              <Activity className="text-indigo-500" size={24} />
              <h3 className="text-2xl font-bold text-white">{resume.section.ongoing}</h3>
           </div>
        </FadeUp>

        <div className="mb-24">
             <StaggerContainer>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {ongoing.map((p, i) => (
                      <StaggerItem key={i}>
                         <NotableCard project={p} icon={Globe} />
                      </StaggerItem>
                   ))}
                </div>
             </StaggerContainer>
        </div>

        {}
        <FadeUp>
           <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <Layers className="text-blue-500" size={24} />
              <h3 className="text-2xl font-bold text-white">{resume.section.notable}</h3>
           </div>
        </FadeUp>

        <div className="mb-24">
             <StaggerContainer>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[...ownership, ...internal].map((p, i) => (
                      <StaggerItem key={i}>
                         <NotableCard project={p} icon={p.category.includes("Internal") ? ShieldCheck : Globe} />
                      </StaggerItem>
                   ))}
                </div>
             </StaggerContainer>
        </div>

        {}
        <FadeUp>
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/5 p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <Code2 size={20} className="text-gray-500" />
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{resume.section.additional}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {resume.additionalProjects.map((p, i) => (
                        <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 text-sm hover:text-white hover:border-blue-500/30 transition-colors cursor-default">
                            {p}
                        </span>
                    ))}
                </div>
            </div>
        </FadeUp>
      </div>
    </section>
  );
}