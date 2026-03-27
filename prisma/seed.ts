import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  await prisma.project.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.profile.deleteMany()

  const profile = await prisma.profile.create({
    data: {
      name: "Kitsakorn Kinaree",
      role: "Full Stack Developer",
      about: "Full Stack Developer with 3+ years of experience in digital agency and martech environments. Strong expertise in API integration, automation, enterprise websites, and marketing technology solutions.",
      email: "kitsakorn.knr@gmail.com",
      phone: "098-2915594",
      availability: "Available for work",
      githubUrl: "",
      linkedinUrl: "",
      btnWorkText: "View My Work",
      btnContactText: "Contact Me"
    }
  })

  const skillsData = [
    { name: "Next.js", category: "Frontend Development" },
    { name: "React", category: "Frontend Development" },
    { name: "TypeScript", category: "Frontend Development" },
    { name: "Vue.js", category: "Frontend Development" },
    { name: "Tailwind CSS", category: "Frontend Development" },
    { name: "Bootstrap", category: "Frontend Development" },
    { name: "SCSS", category: "Frontend Development" },
    { name: "jQuery", category: "Frontend Development" },


    { name: "Node.js", category: "Backend & Database" },
    { name: "PHP", category: "Backend & Database" },
    { name: "SQL", category: "Backend & Database" },
    { name: "Rest API", category: "Backend & Database" },
    { name: "Java", category: "Backend & Database" },
    { name: "Python", category: "Backend & Database" },
    { name: "Google Apps Script", category: "Backend & Database" },

    
    { name: "Git", category: "DevOps & Tools" },
    { name: "Docker", category: "DevOps & Tools" },
    { name: "AWS", category: "DevOps & Tools" },
    { name: "Google Cloud", category: "DevOps & Tools" },
    { name: "Vercel", category: "DevOps & Tools" },
    { name: "Figma", category: "DevOps & Tools" },
    { name: "Postman", category: "DevOps & Tools" },
    { name: "DirectAdmin", category: "DevOps & Tools" },


    { name: "Zapier", category: "Automation & Martech" },
    { name: "IFTTT", category: "Automation & Martech" },
    { name: "SMSMKT", category: "Automation & Martech" },
    { name: "LINE OA Integration", category: "Automation & Martech" },
    { name: "Martech Solutions", category: "Automation & Martech" },
  ]

  for (const s of skillsData) {
    await prisma.skill.create({ data: s })
  }

  
  const projectsData = [
    {
      title: "Rayong Fish Sauce Order",
      category: "Flagship Web Sale System",
      description: "B2B/B2C Web Sale system with Dashboard, Sales functions, PDF/Quotation (QT) generation, and external API integration.",
      link: "#",
      tags: ["Dashboard", "PDF/QT Gen", "Sales API"]
    },
    {
      title: "Daikin KIWAMI Story",
      category: "Flagship Internal / Article",
      description: "Internal article platform & voting system for employee engagement, featuring PDF reporting and ranking logic.",
      link: "#",
      tags: ["Internal System", "PDF Gen", "Voting"]
    },
    {
      title: "Shinyu Real Estate",
      category: "Flagship Buy & Rent Platform",
      description: "Comprehensive Real Estate platform for Buying & Renting properties. Features Google Maps GEO filtering, Compare, and Wishlist.",
      link: "https://shinyurealestate.com/",
      tags: ["Next.js", "Maps API", "Auth"]
    },
    {
      title: "FDI Recruit",
      category: "Flagship Recruitment",
      description: "Job recruitment platform similar to JobsDB. Features candidate registration, job matching, and application tracking system.",
      link: "https://fdirecruit.co.th/",
      tags: ["Job Board", "System", "Registration"]
    },
    {
      title: "Digimusketeers",
      category: "Ongoing Maintenance",
      description: "Main company website with continuous improvements, Martech integrations.",
      link: "https://digimusketeers.co.th/",
      tags: ["Martech", "Lead Gen"]
    },
    {
      title: "Artralux Corporate",
      category: "Ongoing Maintenance",
      description: "Enterprise corporate website with lead form & notification system.",
      link: "https://artralux.co.th/",
      tags: ["Enterprise", "Leads"]
    },
    {
      title: "Megachem Corporate",
      category: "Full Ownership Projects",
      description: "Full website development with SET Smart API integration.",
      link: "https://megachem.co.th/",
      tags: ["Corporate", "API"]
    },
    {
      title: "Napavas",
      category: "Full Ownership Projects",
      description: "Website with custom product pages and map integration.",
      link: "https://napavas.com/",
      tags: ["Product", "Map"]
    },
    {
      title: "Lockbox Thailand",
      category: "Full Ownership Projects",
      description: "Custom frontend logic, URL parameter handling and external API integration.",
      link: "https://lockbox-th.com/",
      tags: ["Logic", "UX/UI"]
    },
    {
      title: "Toppo Dashboard",
      category: "Full Ownership Projects",
      description: "Event dashboard and bill checking system for marketing campaigns.",
      link: "#",
      tags: ["Dashboard", "Data Viz"]
    }
  ]

  for (const p of projectsData) {
    await prisma.project.create({ data: p })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })