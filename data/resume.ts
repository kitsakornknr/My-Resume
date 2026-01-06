import { Github, Linkedin, Code2, Server, Wrench, Zap } from "lucide-react";

const shared = {
  social: [
    { name: "GitHub", url: "https://github.com/kitsakornknr", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kitsakorn-knr/", icon: Linkedin },
  ],
  skills: {
    frontend: { icon: Code2, items: ["Next.js", "React", "TypeScript", "Vue.js", "Tailwind CSS", "Bootstrap", "SCSS", "jQuery"] },
    backend: { icon: Server, items: ["Node.js", "PHP", "SQL", "Rest API", "Java", "Python", "Google Apps Script"] },
    tools: { icon: Wrench, items: ["Git", "Docker", "AWS", "Google Cloud", "Vercel", "Figma", "Postman", "DirectAdmin"] },
    automation: { icon: Zap, items: ["Zapier", "IFTTT", "SMSMKT", "LINE OA Integration", "Martech Solutions"] }
  }
};

export const dictionaries = {
  en: {
    personal: {
      name: "Kitsakorn Kinaree",
      role: "Full Stack Developer",
      about: "Full Stack Developer with 3+ years of experience in digital agency and martech environments. Strong expertise in API integration, automation, enterprise websites, and marketing technology solutions.",
      email: "kitsakorn.knr@gmail.com",
      phone: "098-2915594",
      availability: "Available for work",
      location: "Bangkok, Thailand",
      btn_work: "View My Work",
      btn_contact: "Contact Me"
    },
    section: {
      featured: "Featured Works",
      featured_desc: "Selected projects showcasing full-stack development and scalable system architecture.",
      ongoing: "Ongoing Maintenance & Enhancement",
      notable: "Full Ownership Projects",
      additional: "Additional Contributions",
      contact_title: "Let's Build Something Amazing Together.",
      contact_desc: "If you're looking for a Full Stack Developer with strong expertise in Martech and high-performance web systems, I'm ready to contribute.",
      email_me: "Drop me an email",
      call_me: "Call Me"
    },
    skills: {
      frontend: "Frontend Development",
      backend: "Backend & Database",
      tools: "DevOps & Tools",
      automation: "Automation & Martech",
      title: "Technical Expertise",
      desc: "A comprehensive stack enabling end-to-end development.",
      items: shared.skills
    },
    projects: [
      {
        title: "Rayong Fish Sauce Order",
        category: "Flagship Projects",
        label: "Web Sale System",
        description: "B2B/B2C Web Sale system with Dashboard, Sales functions, PDF/Quotation (QT) generation, and external API integration.",
        tags: ["Dashboard", "PDF/QT Gen", "Sales API"],
        link: "#",
      },
      {
        title: "Daikin KIWAMI Story",
        category: "Flagship Projects",
        label: "Internal / Article",
        description: "Internal article platform & voting system for employee engagement, featuring PDF reporting and ranking logic.",
        tags: ["Internal System", "PDF Gen", "Voting"],
        link: "#",
      },
      {
        title: "Shinyu Real Estate",
        category: "Flagship Projects",
        label: "Buy & Rent Platform",
        description: "Comprehensive Real Estate platform for Buying & Renting properties. Features Google Maps GEO filtering, Compare, and Wishlist.",
        tags: ["Next.js", "Maps API", "Auth"],
        link: "https://shinyurealestate.com/",
      },
      {
        title: "FDI Recruit",
        category: "Flagship Projects",
        label: "Recruitment",
        description: "Job recruitment platform similar to JobsDB. Features candidate registration, job matching, and application tracking system.",
        tags: ["Job Board", "System", "Registration"],
        link: "https://fdirecruit.co.th/",
      },
      {
        title: "Digimusketeers",
        category: "Ongoing Maintenance",
        description: "Main company website with continuous improvements, Martech integrations.",
        tags: ["Martech", "Lead Gen"],
        link: "https://digimusketeers.co.th/",
      },
      {
        title: "Artralux Corporate",
        category: "Ongoing Maintenance",
        description: "Enterprise corporate website with lead form & notification system.",
        tags: ["Enterprise", "Leads"],
        link: "https://artralux.co.th/",
      },
      {
        title: "Megachem Corporate",
        category: "Full Ownership Projects",
        description: "Full website development with SET Smart API integration.",
        tags: ["Corporate", "API"],
        link: "https://megachem.co.th/",
      },
      {
        title: "Napavas",
        category: "Full Ownership Projects",
        description: "Website with custom product pages and map integration.",
        tags: ["Product", "Map"],
        link: "https://napavas.com/",
      },
      {
        title: "Lockbox Thailand",
        category: "Full Ownership Projects",
        description: "Custom frontend logic, URL parameter handling and external API integration.",
        tags: ["Logic", "UX/UI"],
        link: "https://lockbox-th.com/",
      },
      {
        title: "Toppo Dashboard",
        category: "Internal Projects",
        description: "Event dashboard and bill checking system for marketing campaigns.",
        tags: ["Dashboard", "Data Viz"],
        link: "#",
      },
    ],
    additionalProjects: [ "Aiportels", "Beartai", "Fitsi Website" ],
    social: shared.social
  },

  th: {
    personal: {
      name: "กฤษกร กินรี.",
      role: "Full Stack Developer",
      about: "นักพัฒนา Full Stack ประสบการณ์ 3+ ปี ในสาย Digital Agency และ Martech เชี่ยวชาญด้านการเชื่อมต่อ API, ระบบ Automation, เว็บไซต์องค์กรขนาดใหญ่ และโซลูชันทางการตลาด",
      email: "kitsakorn.knr@gmail.com",
      phone: "098-2915594",
      availability: "พร้อมเริ่มงาน",
      location: "กรุงเทพมหานคร",
      btn_work: "ดูผลงาน",
      btn_contact: "ติดต่อฉัน"
    },
    section: {
      featured: "ผลงานเด่น",
      featured_desc: "โปรเจกต์ที่แสดงศักยภาพด้าน Full-Stack และสถาปัตยกรรมระบบที่ซับซ้อน",
      ongoing: "งานดูแลและพัฒนาต่อเนื่อง",
      notable: "โปรเจกต์ที่พัฒนาเต็มรูปแบบ",
      additional: "ผลงานเพิ่มเติม",
      contact_title: "มาร่วมสร้างสรรค์ผลงานไปด้วยกัน",
      contact_desc: "หากคุณกำลังมองหา Full Stack Developer ที่เชี่ยวชาญด้าน Martech และเว็บประสิทธิภาพสูง ผมพร้อมที่จะร่วมงานกับคุณ",
      email_me: "ส่งอีเมลหาผม",
      call_me: "โทรติดต่อ"
    },
    skills: {
      frontend: "การพัฒนาฝั่งหน้าบ้าน",
      backend: "ระบบหลังบ้านและฐานข้อมูล",
      tools: "เครื่องมือและ DevOps",
      automation: "ระบบอัตโนมัติและ Martech",
      title: "ความเชี่ยวชาญทางเทคนิค",
      desc: "เทคโนโลยีครบวงจรสำหรับการพัฒนาระบบตั้งแต่ต้นจนจบ",
      items: shared.skills
    },
    projects: [
      {
        title: "Rayong Fish Sauce Order",
        category: "Flagship Projects",
        label: "ระบบ Web Sale",
        description: "ระบบขายสินค้าออนไลน์ (Web Sale) รองรับการขาย B2B/B2C พร้อม Dashboard, ออกใบเสนอราคา (QT/PDF) และเชื่อมต่อ API ภายนอก",
        tags: ["Dashboard", "PDF/QT Gen", "Sales API"],
        link: "#",
      },
      {
        title: "Daikin KIWAMI Story",
        category: "Flagship Projects",
        label: "Internal / บทความ",
        description: "แพลตฟอร์มบทความและการโหวตภายในองค์กร (Internal System) เพื่อสร้าง Engagement พนักงาน พร้อมระบบรายงานผล PDF",
        tags: ["Internal System", "PDF Gen", "Voting"],
        link: "#",
      },
      {
        title: "Shinyu Real Estate",
        category: "Flagship Projects",
        label: "แพลตฟอร์ม ซื้อ-เช่า",
        description: "เว็บไซต์อสังหาริมทรัพย์ครบวงจร สำหรับการ 'ซื้อและเช่า' (Buy & Rent) พร้อมฟีเจอร์เปรียบเทียบ, Wishlist และค้นหาด้วย Google Maps",
        tags: ["Next.js", "Maps API", "Auth"],
        link: "https://shinyurealestate.com/",
      },
      {
        title: "FDI Recruit",
        category: "Flagship Projects",
        label: "ระบบรับสมัครงาน",
        description: "แพลตฟอร์มสำหรับผู้หางานและบริษัท (Recruitment Platform) ฟีเจอร์ครบครันตั้งแต่ลงทะเบียน ฝากประวัติ และจัดการใบสมัคร",
        tags: ["Job Board", "System", "Registration"],
        link: "https://fdirecruit.co.th/",
      },
      {
        title: "Digimusketeers",
        category: "Ongoing Maintenance",
        description: "เว็บไซต์หลักของบริษัท พร้อมการปรับปรุงอย่างต่อเนื่องและการเชื่อมต่อ Martech",
        tags: ["Martech", "Lead Gen"],
        link: "https://digimusketeers.co.th/",
      },
      {
        title: "Artralux Corporate",
        category: "Ongoing Maintenance",
        description: "เว็บไซต์องค์กรขนาดใหญ่ พร้อมระบบฟอร์ม Lead และการแจ้งเตือน",
        tags: ["Enterprise", "Leads"],
        link: "https://artralux.co.th/",
      },
      {
        title: "Megachem Corporate",
        category: "Full Ownership Projects",
        description: "พัฒนาเว็บไซต์เต็มรูปแบบ พร้อมเชื่อมต่อ SET Smart API",
        tags: ["Corporate", "API"],
        link: "https://megachem.co.th/",
      },
      {
        title: "Napavas",
        category: "Full Ownership Projects",
        description: "เว็บไซต์พร้อมหน้าสินค้าแบบ Custom และการเชื่อมต่อแผนที่",
        tags: ["Product", "Map"],
        link: "https://napavas.com/",
      },
      {
        title: "Lockbox Thailand",
        category: "Full Ownership Projects",
        description: "Logic หน้าบ้านแบบ Custom การจัดการ URL Parameter และเชื่อมต่อ API ภายนอก",
        tags: ["Logic", "UX/UI"],
        link: "https://lockbox-th.com/",
      },
      {
        title: "Toppo Dashboard",
        category: "Internal Projects",
        description: "แดชบอร์ดงานอีเวนต์และระบบตรวจสอบบิลสำหรับแคมเปญการตลาด",
        tags: ["Dashboard", "Data Viz"],
        link: "#",
      },
    ],
    additionalProjects: [ "Aiportels", "Beartai", "Fitsi Website" ],
    social: shared.social
  }
};