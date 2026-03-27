"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HoverScale, FadeUp } from './Motion';
import { TypeAnimation } from 'react-type-animation';
import { Profile } from '@prisma/client';
export default function Hero({ profile }: { profile: Profile }) {
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] opacity-50 -z-10" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold tracking-wider text-green-400 uppercase bg-green-900/20 rounded-full border border-green-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {profile.availability}
            </div>
        </FadeUp>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-tight"
        >
          Hello, I'm <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </motion.h1>

        <FadeUp delay={0.3}>
            <div className="text-xl md:text-3xl text-gray-300 font-mono mb-10 h-[40px]">
            <span className="text-blue-500">{'>'}</span>{' '}
            <TypeAnimation
                sequence={[
                profile.role,
                2000,
                "Agency & Martech Specialist",
                2000,
                "Building Digital Experiences",
                2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
            />
            </div>
        </FadeUp>

        <FadeUp delay={0.4}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
             {profile.about}
            </p>
        </FadeUp>

        <FadeUp delay={0.5}>
            <div className="flex flex-col md:flex-row gap-5 justify-center">
            <HoverScale>
                <Link href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-2">
                  {profile.btnWorkText}
                </Link>
            </HoverScale>
            
            <HoverScale>
                <Link href="#contact" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition flex items-center justify-center gap-2 backdrop-blur-sm">
                  {profile.btnContactText}
                </Link>
            </HoverScale>
            </div>
        </FadeUp>
      </div>
    </section>
  );
}