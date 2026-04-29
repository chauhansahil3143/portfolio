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
  email: "sahil@example.com", // Replace with your actual email address
  heroHeadingPrefix: "Engineering", // Top part of the main heading
  heroHeadingHighlight: "in Zero-G.", // Colored bottom part of the main heading
  heroSubtitle: "I'm a 2nd-year Computer Engineering student at BVM Anand. I am passionate about technology and currently focusing on Web Development, Data Structures and Algorithms (DSA), and Python.",
  aboutHeadingPrefix: "Building at the edge of ", // Top part of the About heading
  aboutHeadingHighlight: "technology & logic.", // Colored bottom part of the About heading
  aboutBio1: "I am a Computer Engineering undergraduate at Birla Vishvakarma Mahavidyalaya (BVM), Anand. I have a strong passion for problem-solving and building useful applications.",
  aboutBio2: "Currently in my 2nd year, I am dedicating my time to mastering Web Development, practicing Data Structures and Algorithms (DSA) to hone my logical skills, and exploring Python. I love bringing ideas to life through code.",
  profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800", // You can paste any direct image link here!
  github: "https://github.com", // Add your GitHub profile link
  linkedin: "https://linkedin.com", // Add your LinkedIn profile link
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
  { icon: '📚', label: '2nd Year', sub: 'Undergrad' },
  { icon: '💻', label: 'Learning', sub: 'Web Dev & DSA' },
];

export const heroStats = [
  { value: '2nd', label: 'Year Student' },
  { value: '3+', label: 'Tech Stacks' },
  { value: '2+', label: 'Projects Built' },
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
    description: 'A platform designed for college students to easily report and find lost items on campus. Built to help the community recover lost belongings quickly.',
    tags: ['Web Development', 'Python', 'Frontend'],
    github: 'https://github.com', // Link your GitHub repo here
    demo: null, // Add a live link here if deployed
    accent: '#7c5cff',
  },
  {
    id: 'proj-placeholder',
    icon: '🚀',
    iconBg: 'rgba(99,210,255,0.12)',
    title: 'Add Your Next Project Here',
    description: 'You can easily add new projects or edit existing ones by modifying the `src/config/data.ts` file. Just copy a project block and fill in your details!',
    tags: ['Learning', 'Next.js'],
    github: 'https://github.com',
    demo: null,
    accent: '#63d2ff',
  }
];
