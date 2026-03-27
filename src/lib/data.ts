export const personalInfo = {
  name: 'Abdulrahman',
  title: 'Front-End Developer | Aspiring Full-Stack Developer',
  tagline: 'Building responsive, user-focused web applications.Available for freelance and internship opportunities.',
  shortBio:
    'I build fast, modern websites that help businesses create a strong digital presence.',
  bio: `I'm a passionate Front-End Developer focused on building responsive and user-friendly web applications.

I enjoy turning ideas into real, functional products and continuously improving my skills in modern web technologies. Currently, I am expanding into back-end development to become a well-rounded full-stack developer.

I believe in writing clean, maintainable code and creating experiences that are both functional and visually appealing.`,
  location: 'Bauchi, Nigeria',
  available: true,
  email: 'abdulmdauda2006@gmail.com',
  github: 'https://github.com/Abdulrahman20066',
  linkedin: 'https://www.linkedin.com/in/abdulrahman-muhammad-dauda-0685433b6',
  twitter: '',
  resumeUrl: '/resume.pdf',
};

export const skills = {
  frontend: [
    { name: 'React', icon: '⚛️', level: 75 },
    { name: 'Next.js', icon: '▲', level: 70 },
    { name: 'HTML/CSS', icon: 'HT', level: 85 },
    { name: 'Tailwind', icon: '🎨', level: 80 },
    { name: 'Three.js', icon: '🌐', level: 60 },
  ],
  backend: [
    { name: 'Node.js', icon: '🟢', level: 65 },
    { name: 'Express', icon: '🛤️', level: 60 },
    { name: 'PostgreSQL', icon: '🐘', level: 60 },
    { name: 'Supabase', icon: '⚡', level: 70 },
    { name: 'REST APIs', icon: '🔌', level: 75 },
  ],
  tools: [
    { name: 'Git', icon: '🔀', level: 80 },
    { name: 'Figma', icon: '✏️', level: 70 },
    { name: 'Vercel', icon: '▲', level: 85 },
    { name: 'WordPress', icon: '🌐', level: 80 },
  ],
};

export const experiences = [
  {
    id: '1',
    role: 'Freelance Front-End Developer',
    company: 'Self-Employed',
    period: '2024 — Present',
    location: 'Remote',
    desc: 'Designing and developing responsive websites for small businesses and individuals, focusing on performance, usability, and modern design.',
    tags: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
  },
  {
    id: '2',
    role: 'Front-End Developer',
    company: 'Saadaj Kitchen (Client Project)',
    period: '2026',
    location: 'Remote',
    desc: 'Built a responsive restaurant website to showcase menu offerings and improve online visibility, using clean UI design and mobile-first development.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];

export const education = [
  {
    id: '1',
    degree: 'Diploma in Computer Science',
    school: 'Federal Polytechnic Bauchi',
    period: '2024 — Expected 2026',
    desc: 'Focused on Web Development, UI/UX Design, and Programming Fundamentals.',
  },
];

export const projects = [
  {
    id: '1',
    title: 'E-Commerce Web Application',
    description:
      'Developed a responsive e-commerce web application with product browsing, cart functionality, and checkout UI. Focused on reusable components, performance optimization, and clean state management.',
    image: '/projects/ecommerce.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    github: 'https://github.com/Abdulrahman20066/ecommerce-app',
    live: 'https://portfolio-abdulrahman20066s-projects.vercel.app',
    featured: true,
  },
  {
    id: '2',
    title: 'Restaurant Website (Saadaj Kitchen)',
    description:
      'Designed and developed a responsive restaurant website to improve customer engagement and clearly present menu offerings across all devices.',
    image: '/projects/restaurant.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Abdulrahman20066/saadaj-kitchen',
    live: 'https://portfolio-abdulrahman20066s-projects.vercel.app',
    featured: true,
  },
  {
    id: '3',
    title: 'Modern UI Design System',
    description:
      'Designed a clean and responsive user interface system focusing on usability, accessibility, and visual hierarchy using Figma.',
    image: '/projects/uiux.png',
    tags: ['Figma', 'UI/UX', 'Responsive Design'],
    github: '',
    live: '',
    featured: false,
  },
];