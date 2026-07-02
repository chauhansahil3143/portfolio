// ============================================================================
// ⚙️ PORTFOLIO CONFIGURATION DATA
// ============================================================================
// Edit the information below to automatically update your portfolio website!
// You can add new projects to the `projectsData` array or update your skills in `skillsData`.

export const personalInfo = {
  name: "Chauhan Sahil",
  firstName: "Sahil",
  lastName: "Chauhan",
  role: "Computer Engineering Student",
  college: "BVM Anand",
  year: "2nd Year",
  email: "sahilchauhansmc@gmail.com", // Replace with your actual email address
  phone: "+91 90235 25208",
  heroHeadingPrefix: "I BUILD THINGS", // Top part of the main heading
  heroHeadingHighlight: "THAT MATTER.", // Colored bottom part of the main heading
  heroSubtitle: "I'm a 2nd-year Computer Engineering student at BVM Anand. I am passionate about technology and currently focusing on Web Development, Data Structures and Algorithms (DSA), and Python.",
  aboutHeadingPrefix: "Building at the edge of ", // Top part of the About heading
  aboutHeadingHighlight: "technology & logic.", // Colored bottom part of the About heading
  aboutBio1: "I am a Computer Engineering undergraduate at Birla Vishvakarma Mahavidyalaya (BVM), Anand. I have a strong passion for problem-solving and building useful applications.",
  aboutBio2: "Currently in my 2nd year, I am dedicating my time to mastering Web Development, practicing Data Structures and Algorithms (DSA) to hone my logical skills, and exploring Python. I love bringing ideas to life through code.",
  profileImage: "/profile1.png", // Profile image from the public folder
  github: "https://github.com/chauhansahil3143/", // Add your GitHub profile link
  linkedin: "https://www.linkedin.com/in/sahil-chauhan3143/", // Add your LinkedIn profile link
  twitter: "https://twitter.com", // Add your Twitter/X profile link
};

export const aboutTerminalData = {
  name: "Chauhan Sahil",
  role: "Computer Engineering Student",
  location: "Anand, Gujarat",
  education: "2nd Year, BVM Anand",
  currentlyLearning: [
    "Web Development",
    "Data Structures & Algorithms (DSA)",
    "Python"
  ],
  openToWork: true,
};

export const aboutQuickFacts = [
  { icon: '🎓', label: 'BVM Anand', sub: 'CE Student' },
  { icon: '📚', label: '2nd Year', sub: 'Undergraduate' },
  { icon: '💻', label: 'Learning', sub: 'Web Dev & DSA' },
];

export const heroStats = [
  { value: '2nd', label: 'Year Student' },
  { value: '3+', label: 'Tech Stacks' },
  { value: '4+', label: 'Projects Built' },
  { value: '💯', label: 'Passion' },
];

export const skillsData = [
  {
    category: 'Languages',
    icon: '💻',
    color: '#ff6b6b',
    skills: [
      { name: 'Python', pct: 85 },
      { name: 'C / C++', pct: 80 },
      { name: 'JavaScript', pct: 70 },
      { name: 'HTML / CSS', pct: 90 },
    ],
  },
  {
    category: 'Core Concepts',
    icon: '🧠',
    color: '#63d2ff',
    skills: [
      { name: 'Data Structures (DSA)', pct: 80 },
      { name: 'Algorithms', pct: 75 },
      { name: 'Problem Solving', pct: 85 },
      { name: 'OOP', pct: 85 },
    ],
  },
  {
    category: 'Web Development',
    icon: '🌐',
    color: '#00ffc8',
    skills: [
      { name: 'Frontend Dev', pct: 75 },
      { name: 'React / Next.js', pct: 60 },
      { name: 'Node.js', pct: 50 },
      { name: 'Responsive Design', pct: 80 },
    ],
  },
  {
    category: 'Tools & Other',
    icon: '🛠️',
    color: '#a78bfa',
    skills: [
      { name: 'Git & GitHub', pct: 85 },
      { name: 'VS Code', pct: 95 },
      { name: 'Figma', pct: 60 },
      { name: 'Linux Basics', pct: 70 },
    ],
  },
];

export const projectsData = [
  {
    id: 'proj-campus-found',
    icon: '🔍',
    iconBg: 'rgba(124,92,255,0.15)',
    title: 'Campus Found',
    subtitle: 'Lost & Found Campus Helper',
    description: 'A platform designed for college students to easily report and find lost items on campus. Built to help the community recover lost belongings quickly.',
    tags: ['Web Development', 'Python', 'Frontend'],
    github: 'https://github.com/chauhansahil3143/student-aid-search',
    demo: 'https://bvmfind.web.app/',
    youtube: 'https://youtu.be/O5inlsb3LM0?si=7_Bpck4BthRIsfQ4',
    accent: '#7c5cff',
    image: '/projects/campus-found.png',
    year: '2023',
    category: 'Web Application',
  },
  {
    id: 'proj-campushub',
    icon: '🏫',
    iconBg: 'rgba(16, 185, 129, 0.15)',
    title: 'CampusHub',
    subtitle: 'Academic Command Center',
    description: 'Your ultimate academic command center. Access verified notes and past year questions (PYQs) uploaded by seniors, collaborate in branch-specific real-time chat rooms, and upload study materials to help your peers.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    github: 'https://github.com/chauhansahil3143/CampusHub',
    demo: 'https://campus-hub-green-beta.vercel.app/',
    accent: '#10b981',
    image: '/projects/campushub.png',
    year: '2024',
    category: 'AI & Collaboration Portal',
  },
  {
    id: 'proj-jalasai-mobile',
    icon: '📱',
    iconBg: 'rgba(59, 130, 246, 0.15)',
    title: 'JalaSai Mobile',
    subtitle: 'Premium Repair Service Portal',
    description: 'A professional repair service web application for Shree Jalasai Mobile in Surat. Features display systems for phone repair categories (screens, motherboards, cameras, batteries) and easy consultation bookings for iPhone and Android devices.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/chauhansahil3143/jalasai-project',
    demo: 'https://jalasai-project.vercel.app/',
    accent: '#3b82f6',
    image: '/projects/jalasai-mobile.png',
    year: '2024',
    category: 'Commercial Web App',
  },
  {
    id: 'proj-bvm-chatbot',
    icon: '💬',
    iconBg: 'rgba(167, 139, 250, 0.15)',
    title: 'BVM ChatBot',
    subtitle: 'AI Academic Assistant',
    description: 'An AI-powered academic helper for Birla Vishvakarma Mahavidyalaya engineering students. Powered by Grok AI, it features an interactive assistant for studies and college info, newcomer FAQs, lab and map finders, and image upload capabilities for parsing notice boards.',
    tags: ['Next.js', 'Grok AI', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/chauhansahil3143/chatbot',
    demo: 'https://chatbot-six-omega-67.vercel.app/',
    accent: '#a78bfa',
    image: '/projects/bvm-chatbot.png',
    year: '2024',
    category: 'Grok-Powered AI Helper',
  }
];

export const eventsData = [
  {
    id: 'event-1',
    title: 'Hackathon 2023',
    date: 'Oct 15, 2023',
    description: 'Participated in a 48-hour hackathon building an AI-powered study companion. Won 2nd place in the student category.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    color: '#ff6b6b'
  },
  {
    id: 'event-2',
    title: 'Web Dev Workshop',
    date: 'Jan 20, 2024',
    description: 'Attended a hands-on workshop covering modern frontend frameworks, Next.js, and advanced CSS layout techniques.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80',
    color: '#a78bfa'
  },
  {
    id: 'event-3',
    title: 'Tech Symposium',
    date: 'Mar 10, 2024',
    description: 'Tech Symposium where industry leaders discussed the future of AI, web3, and cloud computing. Networked with senior engineers.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80',
    color: '#00ffc8'
  },
  {
    id: 'event-4',
    title: 'Open Source Sprint',
    date: 'May 05, 2024',
    description: 'Contributed to open source projects during a weekend sprint. Submitted multiple PRs fixing bugs and improving documentation.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    color: '#63d2ff'
  }
];
