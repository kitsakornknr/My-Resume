import { getResumeData } from "./actions";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Link from "next/link";
import { Lock } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getResumeData();

  if (!data?.profile) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">No Data in Database. Please check Prisma Seed.</div>;
  }

  return (
    <main className="bg-black min-h-screen relative">
       {}
       <div className="fixed top-20 right-4 z-50">
         <Link href="/login" className="bg-white/10 rounded-full text-white/20 hover:text-white hover:bg-white/20 transition">
            <Lock size={16}/>
         </Link>
      </div>

      <Navbar />
      
      {}
      <Hero profile={data.profile} />
      
      <Skills skills={data.skills} />
      
      <Projects projects={data.projects} />
      
      <Contact profile={data.profile} />
      
      <Footer />
    </main>
  );
}