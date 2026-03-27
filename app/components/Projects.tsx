"use client";

import { useState, useRef } from 'react';
import { Star, Layers, Activity, ExternalLink, Monitor, LayoutDashboard, Rocket } from 'lucide-react'; // นำเข้า Rocket เพิ่ม

const ProjectImage = ({ image }: { image: string }) => {
  const [isLongImage, setIsLongImage] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [duration, setDuration] = useState(6000);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    const img = imgRef.current;
    const container = containerRef.current;

    if (img && container) {
      const excessHeight = img.offsetHeight - container.offsetHeight;
      if (excessHeight > 0) {
        setIsLongImage(true);
        setScrollAmount(excessHeight);
        const calculatedDuration = Math.max(3000, excessHeight * 10); 
        setDuration(calculatedDuration);
      } else {
        setIsLongImage(false);
        setScrollAmount(0);
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#050505] border-b border-white/5">
      <div ref={containerRef} className="relative w-full aspect-video overflow-hidden cursor-pointer group/img">
        <div 
          className="w-full absolute top-0 left-0 ease-in-out transition-transform"
          style={{ 
            transitionDuration: `${duration}ms`,
            transform: `translateY(var(--scroll-y, 0px))`
          }}
          onMouseEnter={(e) => isLongImage && e.currentTarget.style.setProperty('--scroll-y', `-${scrollAmount}px`)}
          onMouseLeave={(e) => e.currentTarget.style.setProperty('--scroll-y', '0px')}
        >
          <img 
            ref={imgRef}
            src={image} 
            alt="Project Screenshot" 
            onLoad={handleImageLoad}
            className="w-full h-auto object-cover object-top" 
          />
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
           <div className="bg-black/80 p-3 rounded-full border border-white/20 backdrop-blur-md shadow-2xl transform scale-90 group-hover/img:scale-100 transition-transform duration-300">
              <ExternalLink size={20} className="text-white" />
           </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, icon: Icon, colorClass }: { project: any, icon: any, colorClass: string }) => (
  <a 
    href={project.link || '#'} 
    target="_blank" 
    className="group block h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-xl transition-all duration-300 flex flex-col relative hover:-translate-y-1"
  >
    <ProjectImage image={project.image} />
    <div className="p-6 flex flex-col flex-grow relative bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${colorClass}-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
        <div className="flex justify-between items-start mb-3">
           <div className="flex items-center gap-2">
             <Icon size={18} className={`text-${colorClass}-400 group-hover:text-${colorClass}-300 transition-colors`} />
             <h4 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors">{project.title}</h4>
           </div>
        </div>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed group-hover:text-gray-400 transition-colors">
            {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
           {project.tags?.slice(0, 5).map((t: string) => (
             <span key={t} className="text-[10px] font-mono text-gray-500 bg-[#111] px-2.5 py-1 rounded border border-white/5 group-hover:border-white/10 group-hover:text-gray-300 transition-colors">
               {t}
             </span>
           ))}
        </div>
    </div>
  </a>
);

export default function Projects({ projects }: { projects: any[] }) {
  const [activeTab, setActiveTab] = useState("Flagship");

  const tabs = [
    { id: "Flagship", label: "Flagship", icon: Star, color: "text-blue-400", colorClass: "blue" },
    { id: "Internal", label: "Internal & Ownership", icon: LayoutDashboard, color: "text-purple-400", colorClass: "purple" },
    { id: "Landing", label: "Landing Page", icon: Rocket, color: "text-orange-400", colorClass: "orange" }, // เพิ่มใหม่
    { id: "Maintenance", label: "Maintenance", icon: Activity, color: "text-green-400", colorClass: "green" },
  ];

  const getFilteredProjects = () => {
    if (!projects) return [];
    
    switch (activeTab) {
        case "Flagship": 
          return projects.filter(p => p.category === "Flagship Projects");
        case "Internal": 
          return projects.filter(p => 
            p.category === "Full Ownership Projects" || 
            p.category === "Internal Projects"
          );
        case "Landing":
          return projects.filter(p => p.category === "Landing Page Projects"); 
        case "Maintenance": 
          return projects.filter(p => p.category === "Ongoing Maintenance");
        default: 
          return [];
    }
  };

  const filteredProjects = getFilteredProjects();
  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <section id="projects" className="py-24 bg-black text-white relative overflow-hidden min-h-screen">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 text-center md:text-left">
             <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
               Selected <span className="text-white">Projects</span>
             </h2>
             <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 mx-auto md:mx-0" />
        </div>

        <div className="flex flex-wrap gap-2 mb-16 border-b border-white/10 pb-1">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        relative px-6 py-3 rounded-t-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2
                        ${activeTab === tab.id 
                            ? 'text-white bg-[#111] border-t border-x border-white/10' 
                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                        }
                    `}
                >
                    <tab.icon size={16} className={activeTab === tab.id ? tab.color : 'text-gray-600'} />
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-[#111] z-10" />}
                </button>
            ))}
        </div>

        <div className="min-h-[400px]">
            {filteredProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {filteredProjects.map((p) => (
                        <ProjectCard 
                            key={p.id || p.title} 
                            project={p} 
                            icon={currentTab?.icon || Layers}
                            colorClass={currentTab?.colorClass || "blue"}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl bg-[#0a0a0a]">
                    <Layers size={48} className="mb-4 opacity-20" />
                    <p>No projects found in this category.</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}