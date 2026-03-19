// =============================================
// PORTFOLIO DATA — Edit this file to update your portfolio
// =============================================

export const personalInfo = {
  name:       'Abdulrahman ',
  title:      'Full-Stack Developer',
  tagline:    'Building scalable web applications & modern digital products.',
  shortBio:   'I craft high-performance web applications with clean architecture and exceptional UX.',
  bio: `I'm a passionate Full-Stack Developer with experience building modern web applications
from the ground up. I love solving complex problems and turning ideas into polished,
production-ready products.

When I'm not coding, I'm exploring new technologies, contributing to open source,
and continuously leveling up my skills. I believe in writing clean, maintainable code
that scales.`,
  location:   'Bauchi, Nigeria',
  available:  true,
  email:      'abdulmdauda2006@gmail.com',
  github:     'https://github.com/Abdulrahman20066/Abdulrahman20066',
  linkedin:   'www.linkedin.com/in/abdulrahman-muhammad-dauda-0685433b6',
  twitter:    'https://twitter.com/abdulrahman',
  resumeUrl:  '/resume.pdf',
};

export const skills = {
  frontend: [
    { name: 'React',       icon: '⚛️', level: 90 },
    { name: 'Next.js',     icon: '▲',  level: 88 },
    { name: 'Html',  icon: 'HT', level: 85 },
    { name: 'Tailwind',    icon: '🎨', level: 92 },
    { name: 'Three.js',    icon: '🌐', level: 70 },
  ],
  backend: [
    { name: 'Node.js',     icon: '🟢', level: 87 },
    { name: 'Express',     icon: '🛤️', level: 85 },
    { name: 'PostgreSQL',  icon: '🐘', level: 80 },
    { name: 'Supabase',    icon: '⚡', level: 82 },
    { name: 'REST APIs',   icon: '🔌', level: 90 },
  ],
  tools: [
    { name: 'Git',         icon: '🔀', level: 90 },
    { name: 'Canva',      icon: '🐳', level: 75 },
    { name: 'Figma',       icon: '✏️', level: 78 },
    { name: 'Vercel',      icon: '▲',  level: 88 },
    { name: 'Wordpress',       icon: '🐧', level: 80 },
  ],
};

export const experiences = [
  {
    id:       '1',
    role:     'Senior Full-Stack Developer',
    company:  'Abdulrahman Tech Ltd',
    period:   '2022 — Present',
    location: 'Bauchi, Nigeria',
    desc:     'Build a resturant website for a resturant saadaj kitchen',
    tags:     ['Next.js', 'Node.js', 'PostgreSQL', ],
  },
  {
    id:       '2',
    role:     'Full-Stack Developer',
    company:  'personal portfolio',
    period:   '2026',
    location: 'Remote',
    desc:     'Built the websites and web applications for my personal use. ',
    tags:     ['React', 'Tailwin css', 'supabase', 'AWS'],
  },
  {
    id:       '3',
    role:     'Frontend Developer',
    company:  'Abdul Tech ltd.',
    period:   '2025-2026',
    location: 'Bauchi, Nigeria',
    desc:     'Developed responsive user interfaces and implemented pixel-perfect designs. Improved performance scores from 45 to 95 on Lighthouse.',
    tags:     ['React', 'CSS', 'JavaScript', 'REST APIs'],
  },
];

export const education = [
  {
    id:      '1',
    degree:  'Diploma in Computer Science',
    school:  'Faderal Polytechnic Bauchi',
    period:  '2024 — 2025',
    desc:    'Graduated with Upper Class Honours. Focused on Web Development and Data Structures.',
  },
];

export const projects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce solution with product management, cart, checkout, payment processing, and an admin dashboard.',
    image: '/projects/ecommerce.png',
    tags: ['React', 'Express', 'MongoDB', 'Redux', 'Tailwind'],
    github: 'https://github.com/abdulrahman/ecommerce',
    live: 'https://ecommerce.demo.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Developer Portfolio Website',
    description: 'Personal portfolio to showcase projects, skills, and UI/UX design work.',
    image: '/projects/portfolio.png',
    tags: ['React', 'Next.js', 'CSS', 'UI/UX'],
    github: 'https://github.com/abdulrahman/portfolio',
    live: 'http://localhost:3000/#projects', // replace with live URL after deployment
    featured: true,
  },
  {
    id: '3',
    title: 'UI/UX Web Design Project',
    description: 'Designed modern interfaces with focus on usability and clean layouts for a demo website.',
    image: '/projects/uiux.png',
    tags: ['Figma', 'UI/UX', 'Responsive Design', 'Prototyping'],
    github: '', // optional if you don’t have code
    live: '', // optional
    featured: false,
  }
];