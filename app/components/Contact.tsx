"use client";
import { Github, Linkedin, Mail, Phone, ArrowUpRight, MessageSquare } from 'lucide-react';
import { FadeUp } from './Motion';
import { Profile } from '@prisma/client';

export default function Contact({ profile }: { profile: Profile }) {

  return (
    <section id="contact" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-900/20 rounded-full blur-[150px] opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-[#111] border border-white/10 rounded-[3rem] p-8 md:p-16 grid md:grid-cols-2 gap-16 items-center">
            
            <FadeUp>
                <div>
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-8">
                        <MessageSquare size={32} className="text-blue-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Let's Work Together
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                        Have a project in mind or want to discuss modern web technologies? I'm always open to new opportunities.
                    </p>
                    <div className="flex gap-4">
                        {profile.githubUrl && (
                            <a href={profile.githubUrl} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
                                <Github size={20} />
                            </a>
                        )}
                        {profile.linkedinUrl && (
                            <a href={profile.linkedinUrl} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
                                <Linkedin size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </FadeUp>

            <FadeUp delay={0.2}>
                <div className="flex flex-col gap-6">
                    <a href={`mailto:${profile.email}`} className="group block bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:text-blue-400 transition-colors">
                            <ArrowUpRight size={24} />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                                <Mail size={24} />
                            </div>
                            <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">Email Me</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white break-all group-hover:text-blue-300 transition-colors">
                            {profile.email}
                        </h3>
                    </a>

                    <a href={`tel:${profile.phone}`} className="group flex items-center gap-6 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 hover:border-white/30 transition-all">
                          <div className="p-3 bg-green-500/10 rounded-full text-green-400">
                                <Phone size={24} />
                        </div>
                        <div>
                             <span className="text-sm text-gray-400 font-mono uppercase tracking-wider block mb-1">Call Me</span>
                             <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">{profile.phone}</h3>
                        </div>
                    </a>
                </div>
            </FadeUp>
        </div>
      </div>
    </section>
  );
}