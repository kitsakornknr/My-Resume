"use client";

import { motion } from "framer-motion";
import { Code2, Database, Terminal, Zap, Layout } from 'lucide-react';

// 1. แก้ Key ให้ตรงกับค่าใน Database เป๊ะๆ (ตามรูปที่คุณส่งมา)
const CategoryConfig: Record<string, any> = {
  "Frontend Development": { 
    icon: Layout, 
    label: "Frontend Development", 
    color: "text-blue-400" 
  },
  "Backend & Database": { 
    icon: Database, 
    label: "Backend & Infrastructure", 
    color: "text-green-400" 
  },
  "DevOps & Tools": { 
    icon: Terminal, 
    label: "DevOps & Tools", 
    color: "text-orange-400" 
  },
  "Automation & Martech": { 
    icon: Zap, 
    label: "Automation & Martech", 
    color: "text-purple-400" 
  }
};

export default function Skills({ skills }: { skills: any[] }) {
  
  // 2. แก้ List นี้ให้เป็นชื่อเต็ม เพื่อให้ Loop เจอ
  const targetCategories = [
    "Frontend Development", 
    "Backend & Database", 
    "DevOps & Tools", 
    "Automation & Martech"
  ];

  return (
    <section className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      {/* ... (Code ส่วน Header เหมือนเดิม) ... */}
      <div className="container mx-auto px-6 relative z-10">
        {/* ... */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {targetCategories.map((catName, idx) => {
            
            // 3. กรองข้อมูล: เปรียบเทียบแบบตรงไปตรงมา (ไม่ต้อง Lowercase ก็ได้ถ้ามั่นใจว่า Database เป๊ะ)
            // แต่ใส่ trim() ไว้กันพลาดเรื่องวรรคตอน
            const catSkills = skills.filter(s => s.category?.trim() === catName);
            
            if (catSkills.length === 0) return null;

            const config = CategoryConfig[catName] || { icon: Code2, label: catName, color: "text-gray-400" };
            const Icon = config.icon;

            return (
                <div
                key={idx}
                className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-colors group"
                >
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <div className={`p-2 bg-white/5 rounded-lg ${config.color} group-hover:bg-white/10 transition-colors`}>
                        <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                        {config.label}
                    </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill, i) => (
                    <span 
                        key={i} 
                        className="px-3 py-1.5 bg-[#1a1a1a] border border-white/5 rounded-lg text-sm text-gray-300 font-mono hover:text-white hover:border-green-500/50 hover:bg-green-500/10 transition-all cursor-default"
                    >
                        {skill.name}
                    </span>
                    ))}
                </div>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}