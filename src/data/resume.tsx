import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Vivek Solleti",
  initials: "VS",
  url: "https://svivek.tech",
  location: "Vaddeswaram, India",
  locationLink: "https://www.google.com/maps/place/Vaddeswaram",
  description:
    "Final-year Computer Science student with skills in Java, Python, and C++, seeking an entry-level role in fintech.",
  summary:
    "Final-year Computer Science student with foundational skills in Java, Python, and C++, seeking an entry-level role in fintech. Passionate about applying software development knowledge to create secure, efficient applications that align with business objectives and improve user experience. Looking forward to contributing to innovative projects that drive financial technology forward, while building expertise in agile practices and scalable solutions.",
  avatarUrl: "/me.png",
  skills: [
    "C",
    "Java",
    "Python",
    "HTML",
    "CSS",
    "JavaScript",
    "Node JS",
    "SQL",
    "MongoDB",
    "AWS",
    "GitHub",
    "Figma",
    "Time Management",
    "Teamwork",
    "Problem-solving",
    "Documentation",
    "Engaging Presentation",
    "Communication",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "solletivivek@gmail.com",
    tel: "6305075307",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/solletivivek",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/solleti-vivek/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "#",
        icon: Icons.x,
        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "#",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:solletivivek@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Quick Tap Services Pvt Ltd",
      href: "#",
      badges: [],
      location: "India",
      title: "Chief Designer",
      logoUrl: "/ib.png", // Using placeholder image
      start: "July 2023",
      end: "Present",
      description:
        "Led a team in conceptualizing, designing, and implementing a cutting-edge blog website for the college gaming club, fostering an environment for learning and collaboration in gaming technology, particularly Unity game development. The project aimed to provide a platform for enthusiasts to enhance their skills, share knowledge, and showcase their work. This experience honed my skills in frontend architecture and agile development methodologies, emphasizing quick iterations and feedback loops.",
    },
  ],
  education: [
    {
      school: "KL University",
      href: "#",
      degree: "B.Tech in Computer Science, CGPA: 8.96",
      logoUrl: "/image.png", // Using placeholder image
      start: "2021",
      end: "Dec 2025",
    },
    {
      school: "Aditya Jr college",
      href: "#",
      degree: "Board of Intermediate Education, MPC, Marks: 868/1000",
      logoUrl: "/aditya.png", // Using placeholder image
      start: "2019",
      end: "Mar 2021",
    },
  ],
  projects: [
    {
      title: "Amazon Scraper API",
      href: "https://amazone-api.azurewebsites.net",
      dates: "May 2023 - July 2023",
      active: true,
      description:
        "Developed the 'Amazon Scraper API' using Node.js, enabling extraction of product details, ratings, etc., formatted as JSON. Implemented CI/CD pipeline with GitHub Actions for automated testing and deployment.",
      technologies: [
        "API Development",
        "Node.js",
        "Documentation",
        "Data Extraction",
        "Web Scraping",
        "User-Oriented Design",
        "CI/CD",
        "GitHub Actions",
        "Azure",
      ],
      links: [
        {
          type: "Website",
          href: "https://amazone-api.azurewebsites.net",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/solletivivek/amazon-scraper-api",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Travel Tourism and Hospitality Website",
      href: "#",
      dates: "Jan 2023 - Mar 2023",
      active: true,
      description:
        "Led the development of a comprehensive web application using Django that transforms the travel and tourism experience. Integrated CI/CD pipeline for automated testing and deployment with GitHub Actions.",
      technologies: [
        "Django",
        "Python",
        "Database Management",
        "User Authentication",
        "Third-party API Integration",
        "Front-end and Back-end Development",
        "User Experience (UX) Design",
        "Payment Gateway Integration",
        "CI/CD",
        "GitHub Actions",
        "AWS",
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/solletivivek/tourism-website",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "AI Email Sender",
      href: "https://aiemail-qts.netlify.app/",
      dates: "Aug 2023 - Oct 2023",
      active: true,
      description:
        "Developed a bulk email platform with AI integration for subject and content generation. Features include email tracking, management, and analytics for sent messages.",
      technologies: [
        "React",
        "Vite",
        "TailwindCSS",
        "Node.js",
        "Express",
        "Supabase",
        "JWT",
        "Database Management",
        "User Authentication",
        "Third-party API Integration",
        "Front-end and Back-end Development",
        "User Experience (UX) Design",
        "Payment Gateway Integration",
        "CI/CD",
        "GitHub Actions",
      ],
      links: [
        {
          type: "Website",
          href: "https://aiemail-qts.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/solletivivek/ai-email-sender",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "AI Notes",
      href: "https://notes-qts.netlify.app/",
      dates: "Nov 2023 - Jan 2024",
      active: true,
      description:
        "Built a Notion-like platform for creating and storing notes with advanced features for data organization and management.",
      technologies: [
        "React",
        "Vite",
        "TailwindCSS",
        "Magic UI",
        "21.dev UI",
        "Database Management",
        "User Authentication",
        "Third-party API Integration",
        "Front-end and Back-end Development",
        "User Experience (UX) Design",
        "Payment Gateway Integration",
        "CI/CD",
        "GitHub Actions",
      ],
      links: [
        {
          type: "Website",
          href: "https://notes-qts.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/solletivivek/ai-notes",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Agency Landing Page",
      href: "https://projectjason.vercel.app/",
      dates: "Feb 2024 - Mar 2024",
      active: true,
      description:
        "Designed and developed a professional landing page for a US-based agency client on Fiverr, focusing on clean design and modern UI elements.",
      technologies: [
        "React",
        "Vite",
        "TailwindCSS",
        "Magic UI",
        "Acernity UI",
        "Database Management",
        "User Authentication",
        "Third-party API Integration",
        "Front-end and Back-end Development",
        "User Experience (UX) Design",
        "Payment Gateway Integration",
        "CI/CD",
        "GitHub Actions",
      ],
      links: [
        {
          type: "Website",
          href: "https://projectjason.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "UI/UX Design Portfolio",
      href: "https://bit.ly/vivek-design",
      dates: "Jan 2023 - Present",
      active: true,
      description:
        "Comprehensive collection of UI/UX design projects showcasing my expertise in wireframing, prototyping, user research, and creating intuitive interfaces with focus on user experience and modern design principles.",
      technologies: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Prototyping",
        "Wireframing",
        "User Research",
        "Design Systems",
        "User Personas",
        "UI Components",
        "Visual Design",
        "User Testing",
        "Information Architecture",
        "Interaction Design",
        "Design Thinking",
      ],
      links: [
        {
          type: "Figma",
          href: "https://bit.ly/vivek-design",
          icon: <Icons.figma className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  certifications: [
    {
      title: "Fintech Council Certificate",
      dates: "February 2024",
      location: "Fintech Council",
      description: "Professional certification validating expertise in fintech solutions, blockchain applications, and financial data analysis",
      image: "/fintech.png", // Using placeholder image
      links: [],
    },
    {
      title: "AWS Certified Cloud Practitioner",
      dates: "October 2023",
      location: "Amazon Web Services",
      description: "Fundamental understanding of AWS Cloud services, architecture, security, and compliance to deploy and manage cloud applications",
      image: "/aws.png", // Using placeholder image
      links: [],
    },
    {
      title: "AWS Cloud Virtual Internship",
      dates: "June 2023",
      location: "AICTE-Eduskills",
      description: "Intensive virtual internship focused on cloud infrastructure, serverless architecture, and deploying scalable applications on AWS",
      image: "/aws.png", // Using placeholder image
      links: [],
    },
    {
      title: "AWS Academy Cloud Architecting",
      dates: "April 2023",
      location: "AWS Academy",
      description: "Advanced certification covering design and implementation of distributed systems on AWS, following architectural best practices",
      image: "/aws.png", // Using placeholder image
      links: [],
    },
  ],
} as const;
