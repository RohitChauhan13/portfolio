export const FALLBACK_PERSONAL = {
  id: 1,
  full_name: 'Rohit Chouhan',
  tagline: 'Software Engineer & React Native Developer | Full Stack Engineer',
  bio: 'Rohit Chouhan (also searched as Rohit Chauhan) is a Software Engineer and React Native Developer based in Sangli, Maharashtra, India. He builds production mobile applications at GTT Data Solutions, specializing in React Native, Android engineering, offline-first SQLite architectures, and full-stack backend development with Node.js and Express.',
  profile_image_url: 'https://res.cloudinary.com/ulnxdscc/image/upload/v1788179685/portfolio/onmogocjmky9l92deial.jpg',
  github_url: 'https://github.com/RohitChauhan13',
  linkedin_url: 'https://www.linkedin.com/in/rohitchauhan13',
  instagram_url: 'https://www.instagram.com/rohit.chauhan.13',
  email: 'rohitchauhan6232@gmail.com',
  phone: '7024756186',
  location: 'Sangli, Maharashtra, India — 416410'
};

export const FALLBACK_EXPERIENCE = [
  {
    id: 1,
    company: 'GTT Data Solutions, Sangli',
    role: 'Software Engineer',
    start_date: '2025-05-01T00:00:00.000Z',
    end_date: null,
    is_current: 1,
    description: "Build and ship enterprise React Native applications for 5+ commercial clients in an Agile/Scrum environment, developing reusable UI components and integrating REST APIs end-to-end. Architect offline-first mobile storage using SQLite with automatic offline-to-online synchronization, paired with Redux Toolkit for centralized state management. Integrate Firebase Cloud Messaging (FCM) for real-time push notifications. Optimized application performance through pagination and lazy loading, improving app load time by 40%. Worked on aligning multiple projects with Google's mandatory 16KB memory page-size policy, helping migrate 6+ APKs — auditing dependencies, identifying incompatible native libraries, and replacing them for compatibility. Collaborate cross-functionally with engineers and QA to debug production issues and support release maintenance. Helped deploy company projects (RSF and MahaGPS) to the Google Play Console. Top 10 performer in the company-wide Hackathon, which led to this full-time offer.",
    tech_stack: ['React Native', 'Redux Toolkit', 'SQLite', 'Firebase Cloud Messaging', 'REST APIs', 'Google Maps SDK'],
    sort_order: 1
  }
];

export const FALLBACK_EDUCATION = [
  {
    id: 1,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Institute of Management and Rural Development Administration (IMRDA), Sangli — Bharati Vidyapeeth University',
    start_year: '2022',
    end_year: '2025',
    grade: '9.0 / 10 CGPA',
    description: 'Ranked in the Top 1% of the batch.',
    sort_order: 1
  },
  {
    id: 2,
    degree: '12th Standard (HSC)',
    institution: 'Smt. Kasturbai Walchand College, Sangli',
    start_year: '2020',
    end_year: '2022',
    grade: null,
    description: null,
    sort_order: 2
  },
  {
    id: 3,
    degree: '10th Standard (SSC)',
    institution: 'Ganpatrao Arwade High School, Sangli',
    start_year: '2019',
    end_year: '2020',
    grade: null,
    description: null,
    sort_order: 3
  }
];

export const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Shikuyaa',
    slug: 'shikuyaa',
    short_description: 'Production app with 10,000+ users and 50,000+ downloads — built the Bridge 4 Bharat (B4B) module end-to-end.',
    full_description: 'A live, large-scale production app. Developed the Bridge 4 Bharat (B4B) module end-to-end, including mentor/student workflows (listings, detail views, invitation flows), session scheduling with edit/reschedule capability, in-app meeting join functionality, REST API integration for session management, and MeritHub WebView integration for in-app virtual classrooms (recordings, attendance tracking, feedback, session details).',
    tech_stack: ['React Native', 'Redux Toolkit', 'REST APIs', 'WebView (MeritHub)'],
    live_url: null,
    github_url: null,
    is_featured: 1,
    sort_order: 1
  },
  {
    id: 2,
    title: 'Firecrackers Business Suite',
    slug: 'firecrackers-business-suite',
    short_description: 'Freelance end-to-end product: employee app, admin app, and backend server for a wholesale firecrackers business.',
    full_description: 'Independently designed, built, and deployed the entire product end-to-end for a wholesale firecrackers business client. Two production React Native apps (employee-facing and admin-facing) with role-based UI flows and real-time data sync via a custom REST API. Backend built from scratch in Node.js/Express.js/MySQL with query indexing, pagination, search optimization, and rate limiting on high-traffic endpoints. Deployed on a self-provisioned Microsoft Azure Windows VM, co-hosting the API server and MySQL database, with DuckDNS for dynamic DNS and Caddy as reverse proxy.',
    tech_stack: ['React Native', 'Redux Toolkit', 'Node.js', 'Express.js', 'MySQL', 'Microsoft Azure', 'DuckDNS', 'Caddy'],
    live_url: null,
    github_url: null,
    is_featured: 1,
    sort_order: 2
  },
  {
    id: 3,
    title: 'MediMate',
    slug: 'medimate',
    short_description: 'Medicine inventory and customer-credit ("Udhaar") tracking app built for a friend\'s two pharmacies.',
    full_description: 'Built for a friend who owns two medical stores. Stores frequently required medicines for regular customers, tracks out-of-stock items needing reorder, and tracks credit/"Udhaar" records for customers who pay later. RESTful backend built from scratch with CRUD APIs for users, wishlist, and credit tracking. PostgreSQL schema design with connection pooling for users, notifications, and device tokens. Email-based OTP verification and welcome-email flows via the Brevo transactional email API. Firebase Admin SDK integration for multicast push notifications with per-user status tracking.',
    tech_stack: ['React Native', 'Redux Toolkit', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase Admin SDK', 'Brevo API'],
    live_url: null,
    github_url: 'https://github.com/RohitChauhan13/MediMate.git',
    is_featured: 1,
    sort_order: 3
  },
  {
    id: 4,
    title: 'PayPlus',
    slug: 'payplus',
    short_description: 'Employee salary calculation and payroll management system.',
    full_description: 'Calculates employee salaries across daily, weekly, monthly, or custom date ranges, with support for rate-change-based calculations. Splits and tracks payments made partly in cash and partly online (e.g. NEFT), handles TDS calculations, and includes graphical representation of salary/payment data.',
    tech_stack: ['React Native', 'Redux Toolkit', 'Node.js', 'Express.js'],
    live_url: null,
    github_url: 'https://github.com/RohitChauhan13/PayPlusApp.git',
    is_featured: 1,
    sort_order: 4
  },
  {
    id: 5,
    title: 'RSF — Enterprise Employee Management App',
    slug: 'rsf-enterprise-employee-management',
    short_description: 'Enterprise employee management app (pre-production) — built the React Native frontend.',
    full_description: 'Built the React Native (frontend/mobile) side of this enterprise employee management application. Features include a Day-In/Day-Out attendance system with in-app face verification, 24/7 background and trip location tracking via Google Maps SDK, push notifications via FCM, and offline-first location storage with SQLite synchronization. Helped deploy this app to the Google Play Console.',
    tech_stack: ['React Native', 'Redux Toolkit', 'SQLite', 'Firebase', 'Google Maps SDK', 'REST APIs'],
    live_url: null,
    github_url: null,
    is_featured: 0,
    sort_order: 5
  },
  {
    id: 6,
    title: 'Ticket Khidakee',
    slug: 'ticket-khidakee',
    short_description: 'React Native mobile demo app for an event ticket booking client.',
    full_description: 'A company project — a demo mobile app built to showcase mobile capabilities to a client who already had an existing website. Related website: https://www.ticketkhidakee.com/',
    tech_stack: ['React Native'],
    live_url: 'https://www.ticketkhidakee.com/',
    github_url: null,
    is_featured: 0,
    sort_order: 6
  },
  {
    id: 7,
    title: 'MahaGPS',
    slug: 'mahagps',
    short_description: 'Company project — helped deploy to the Google Play Console.',
    full_description: 'Company project at GTT Data Solutions. Contribution was helping deploy the app to the Google Play Console.',
    tech_stack: ['React Native', 'Google Play Console'],
    live_url: null,
    github_url: null,
    is_featured: 0,
    sort_order: 7
  },
  {
    id: 8,
    title: 'Draft Career — AI Resume Builder',
    slug: 'draft-career',
    short_description: '"Vibecoded" (AI-assisted, exploratory) resume builder app.',
    full_description: 'A fully AI-assisted, exploratory build resume builder application created to test and push personal skills and workflow with AI-assisted development.',
    tech_stack: ['React', 'Next.js', 'AI APIs'],
    live_url: 'https://draft-career.vercel.app/',
    github_url: null,
    is_featured: 0,
    sort_order: 8
  },
  {
    id: 9,
    title: 'RAG Bot',
    slug: 'rag-bot',
    short_description: 'Personal Retrieval-Augmented Generation chatbot built on this knowledge base.',
    full_description: 'A Retrieval-Augmented Generation (RAG) chatbot project that users can talk to, built using this personal knowledge base. Deployed on an Azure Windows VM with DuckDNS and Caddy.',
    tech_stack: ['Node.js', 'Express.js', 'RAG AI', 'Azure', 'Caddy'],
    live_url: null,
    github_url: null,
    is_featured: 0,
    sort_order: 9
  }
];

export const FALLBACK_SKILLS = [
  { id: 1, name: 'React Native', category: 'frontend', proficiency: 'Advanced' },
  { id: 2, name: 'Redux Toolkit', category: 'frontend', proficiency: 'Advanced' },
  { id: 3, name: 'React', category: 'frontend', proficiency: 'Advanced' },
  { id: 4, name: 'JavaScript', category: 'frontend', proficiency: 'Advanced' },
  { id: 5, name: 'TypeScript', category: 'frontend', proficiency: 'Intermediate' },
  { id: 6, name: 'Node.js', category: 'backend', proficiency: 'Intermediate' },
  { id: 7, name: 'Express.js', category: 'backend', proficiency: 'Intermediate' },
  { id: 8, name: 'REST API Design & Integration', category: 'backend', proficiency: 'Advanced' },
  { id: 9, name: 'SQLite', category: 'database', proficiency: 'Advanced' },
  { id: 10, name: 'MySQL', category: 'database', proficiency: 'Intermediate' },
  { id: 11, name: 'PostgreSQL', category: 'database', proficiency: 'Intermediate' },
  { id: 12, name: 'Firebase', category: 'database', proficiency: 'Advanced' },
  { id: 13, name: 'Firebase Cloud Messaging (FCM)', category: 'tools', proficiency: 'Advanced' },
  { id: 14, name: 'Google Maps SDK / API', category: 'tools', proficiency: 'Advanced' },
  { id: 15, name: 'Offline-First Architecture', category: 'other', proficiency: 'Advanced' },
  { id: 16, name: 'Google Play Console', category: 'tools', proficiency: 'Intermediate' },
  { id: 17, name: 'Microsoft Azure (VM, Networking)', category: 'tools', proficiency: 'Intermediate' },
  { id: 18, name: 'Git & GitHub', category: 'tools', proficiency: 'Advanced' }
];
