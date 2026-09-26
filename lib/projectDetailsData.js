// Authoritative Technical Case Study Data for Rohit Chouhan's Engineering Projects
// Optimized for Google Search Indexing, High-Ranking Entity SEO, and AI Answer Engines

export const PROJECT_DETAILS = {
  'shikuyaa': {
    title: 'Shikuyaa',
    subtitle: 'EdTech Mobile Ecosystem & Virtual Classroom Architecture',
    metaTitle: 'Shikuyaa Case Study — React Native Architecture & B4B Module | Rohit Chouhan',
    metaDescription: 'Deep dive into Shikuyaa: A production EdTech mobile app with 10,000+ users and 50,000+ downloads. Engineered by Rohit Chouhan (Rohit Chauhan) with React Native, Redux Toolkit, and MeritHub virtual classrooms.',
    client: 'Educational Technology Client / GTT Data Solutions',
    role: 'Lead Mobile Engineer (Bridge 4 Bharat Module)',
    platform: 'Android & iOS Mobile Application',
    status: 'Production (Live on Google Play & App Store)',
    overview: 'Shikuyaa is a flagship production educational technology platform engineered to bridge the educational divide across India. Rohit Chouhan served as the lead mobile engineer on the critical Bridge 4 Bharat (B4B) module, architecting high-concurrency mentor-student interaction pipelines, interactive classroom schedules, and seamless third-party virtual classroom integration.',
    architectureHighlights: [
      {
        title: 'Bridge 4 Bharat (B4B) Core Engine',
        badge: 'Core Workflow',
        description: 'Engineered complex mentor and student bidirectional workflows from scratch. Includes dynamic mentor discovery, profile evaluation, verified student invitation flows, and persistent state hydration across sessions.'
      },
      {
        title: 'Resilient Session Scheduling & Lifecycle',
        badge: 'State Management',
        description: 'Designed robust multi-timezone session booking and instant reschedule mechanics powered by Redux Toolkit. Built real-time conflict detection preventing overlapping classroom bookings across thousands of students.'
      },
      {
        title: 'Low-Latency Virtual Classroom WebView Bridge',
        badge: 'Native Integration',
        description: 'Architected a custom secure bridge with MeritHub virtual classrooms inside an optimized React Native WebView. Handles two-way token authentication, interactive session recording playback, granular attendance logging, and post-session feedback loops without native crashes.'
      },
      {
        title: 'High-Concurrency REST API Integration',
        badge: 'Network Layer',
        description: 'Engineered an offline-resilient REST API client using Axios interceptors with automated token refresh, intelligent exponential backoff retry strategies, and cached responses for low-bandwidth rural connections.'
      }
    ],
    challenges: [
      {
        challenge: 'Synchronizing interactive classroom sessions across flaky rural mobile networks.',
        solution: 'Implemented optimistic local state updates with Redux Toolkit and automatic rollback on network failure, paired with background delta-sync when connection restores.',
        impact: 'Reduced session join failure rate to under 0.2% across 10,000+ active users.'
      },
      {
        challenge: 'Memory leaks and audio-video stuttering inside the embedded WebView classroom.',
        solution: 'Isolated the MeritHub WebView within a dedicated unmount-on-leave memory sandbox, configured hardware acceleration flags, and implemented explicit garbage collection triggers upon classroom exit.',
        impact: 'Lowered peak memory consumption by 45MB per session and achieved 60fps UI responsiveness.'
      }
    ],
    metrics: [
      { label: 'Active Users', value: '10,000+', description: 'Active student & mentor community' },
      { label: 'Total Downloads', value: '50,000+', description: 'Total installs across app stores' },
      { label: 'Session Crash Rate', value: '< 0.2%', description: 'Battle-tested production stability' },
      { label: 'Classroom Uptime', value: '99.9%', description: 'Seamless virtual classroom availability' }
    ],
    faqs: [
      {
        question: 'What is Shikuyaa and what was Rohit Chouhan\'s role in it?',
        answer: 'Shikuyaa is a high-scale production EdTech mobile app with over 50,000 downloads and 10,000+ active users. Rohit Chouhan (also searched as Rohit Chauhan) was the Lead Mobile Engineer responsible for architecting and developing the Bridge 4 Bharat (B4B) module end-to-end, including mentor/student workflows, session scheduling, and MeritHub virtual classroom integration.'
      },
      {
        question: 'What technology stack powers the Shikuyaa mobile application?',
        answer: 'Shikuyaa mobile application is built using React Native, Redux Toolkit for predictable state management, RESTful APIs for session lifecycle management, and custom WebView architecture for integrated MeritHub virtual classrooms.'
      },
      {
        question: 'How did Rohit Chouhan solve virtual classroom integration in React Native?',
        answer: 'Rohit engineered a secure two-way communication bridge between React Native and the MeritHub WebView container, enabling automated authentication, session telemetry, attendance tracking, and clean memory teardowns to prevent crashes on low-end Android devices.'
      },
      {
        question: 'Where can I find more case studies by Rohit Chouhan?',
        answer: 'You can explore Rohit Chouhan\'s full engineering portfolio and case studies at https://rohit-chouhan-portfolio.vercel.app, featuring mobile architectures, offline-first systems, and full-stack cloud projects.'
      }
    ]
  },

  'firecrackers-business-suite': {
    title: 'Firecrackers Business Suite',
    subtitle: 'End-to-End Enterprise ERP, Dual Mobile Apps & Cloud Backend',
    metaTitle: 'Firecrackers Business Suite Case Study — Dual React Native Apps & Node.js ERP | Rohit Chouhan',
    metaDescription: 'Full-stack enterprise case study: Dual React Native apps (Employee & Admin) and Node.js/MySQL backend deployed on Microsoft Azure VM with Caddy reverse proxy by Rohit Chouhan.',
    client: 'Wholesale Firecrackers Commercial Enterprise Client',
    role: 'Solo Full-Stack Software Architect & Cloud Engineer',
    platform: 'Android Mobile Apps (Admin + Staff) & Azure Cloud API',
    status: 'Production (Deployed on Azure VM)',
    overview: 'An end-to-end proprietary enterprise management suite designed, engineered, and deployed independently by Rohit Chouhan for a wholesale firecrackers commercial enterprise. The system replaces fragmented manual paper invoicing with dual role-based React Native mobile applications synchronized with a custom high-performance Node.js/Express backend hosted on a self-managed Microsoft Azure VM.',
    architectureHighlights: [
      {
        title: 'Dual-Role Mobile Architecture (Admin & Staff)',
        badge: 'Mobile Systems',
        description: 'Engineered two distinct React Native mobile apps with strict RBAC (Role-Based Access Control). The Admin app manages bulk pricing, seasonal stock levels, and revenue analytics; the Employee app streamlines live order intake and warehouse fulfillment.'
      },
      {
        title: 'Optimized Node.js / Express REST Backend',
        badge: 'Backend Architecture',
        description: 'Built a modular RESTful backend from the ground up featuring multi-column MySQL query indexing, cursor-based pagination, full-text catalog search, and granular rate-limiting on high-traffic inventory endpoints.'
      },
      {
        title: 'Self-Provisioned Microsoft Azure VM & Reverse Proxy',
        badge: 'DevOps & Cloud',
        description: 'Provisioned and configured a Microsoft Azure Windows Virtual Machine co-hosting the Node.js runtime and MySQL database. Automated dynamic DNS using DuckDNS and implemented Caddy as a high-speed reverse proxy with automated Let\'s Encrypt SSL certificates.'
      },
      {
        title: 'Seasonal Traffic Peak Defense',
        badge: 'Reliability',
        description: 'Implemented in-memory caching and request deduplication to withstand extreme festive seasonal traffic surges without database connection pool exhaustion.'
      }
    ],
    challenges: [
      {
        challenge: 'Managing extreme seasonal inventory spikes during festive sales without server crashes.',
        solution: 'Configured connection pooling, indexed frequently queried SKU and transaction columns, and deployed Caddy reverse proxy rate-limiting to protect database throughput.',
        impact: 'Maintained 100% uptime with sub-100ms API response latency during peak sales volume.'
      },
      {
        challenge: 'Maintaining real-time inventory consistency between staff taking orders and admin adjustments.',
        solution: 'Implemented atomic database transactions and versioned stock checkouts to eliminate race conditions and stock overselling.',
        impact: 'Completely eliminated inventory discrepancy errors across tens of thousands of SKU transactions.'
      }
    ],
    metrics: [
      { label: 'API Latency', value: '< 90ms', description: 'Indexed MySQL query performance' },
      { label: 'Peak Uptime', value: '100%', description: 'Zero downtime during seasonal spikes' },
      { label: 'Apps Shipped', value: '2 Apps', description: 'Dedicated Admin & Staff Mobile Clients' },
      { label: 'Cloud Architecture', value: 'Azure VM', description: 'Co-hosted Node.js, MySQL & Caddy' }
    ],
    faqs: [
      {
        question: 'What is Firecrackers Business Suite?',
        answer: 'Firecrackers Business Suite is an end-to-end commercial software suite built for a wholesale business client. It consists of two React Native mobile applications (Admin and Employee) and a custom Node.js/Express/MySQL backend server hosted on Microsoft Azure.'
      },
      {
        question: 'Who developed Firecrackers Business Suite?',
        answer: 'Rohit Chouhan (Rohit Chauhan) independently architected, built, and deployed the entire suite end-to-end, including both mobile frontends, database schema design, REST APIs, and Azure cloud infrastructure.'
      },
      {
        question: 'How is the backend infrastructure configured for Firecrackers Business Suite?',
        answer: 'The backend is deployed on a self-managed Microsoft Azure Windows VM running Node.js and MySQL, reverse-proxied through Caddy with automatic SSL certificates and dynamic DNS routing via DuckDNS.'
      }
    ]
  },

  'medimate': {
    title: 'MediMate',
    subtitle: 'Pharmacy Inventory & Customer Credit ("Udhaar") Ledger Ecosystem',
    metaTitle: 'MediMate Case Study — Pharmacy Inventory & Credit Ledger System | Rohit Chouhan',
    metaDescription: 'Production pharmacy inventory and customer credit ("Udhaar") tracking mobile app and REST backend built with React Native, Node.js, PostgreSQL, Brevo, and Firebase by Rohit Chouhan.',
    client: 'Two Commercial Retail Pharmacies',
    role: 'Full Stack Engineer & Database Architect',
    platform: 'Android Mobile Application & Cloud Backend',
    status: 'Production (Deployed & Open Source on GitHub)',
    githubUrl: 'https://github.com/RohitChauhan13/MediMate.git',
    overview: 'MediMate is a specialized retail healthcare and inventory management system engineered for pharmacy owners to manage customer credit ("Udhaar"), track frequently purchased patient medications, and automate re-ordering for out-of-stock items. Designed and shipped by Rohit Chouhan to eliminate manual ledger books and prescription stockouts.',
    architectureHighlights: [
      {
        title: 'Immutable Credit ("Udhaar") Ledger',
        badge: 'Financial Reliability',
        description: 'Engineered a double-entry style audit log for customer pharmacy credit lines, tracking partial cash payments, pending balances, and transaction timestamps with PostgreSQL constraint guarantees.'
      },
      {
        title: 'PostgreSQL Schema & Connection Pooling',
        badge: 'Database Design',
        description: 'Designed normalized relational schemas covering medicines, recurring patient prescriptions, and store owners. Integrated pg-pool connection pooling to handle concurrent database queries efficiently.'
      },
      {
        title: 'Brevo Transactional Email & OTP Verification',
        badge: 'Security',
        description: 'Implemented automated customer onboarding and email OTP authentication using Brevo (formerly Sendinblue) transactional email APIs with signed JWT session verification.'
      },
      {
        title: 'Firebase Admin SDK Multicast Push Notifications',
        badge: 'Cloud Messaging',
        description: 'Built automated notification dispatching using Firebase Admin SDK to alert pharmacy owners the instant critical medicines drop below minimum safety thresholds.'
      }
    ],
    challenges: [
      {
        challenge: 'Ensuring absolute consistency in customer credit balances during concurrent store transactions.',
        solution: 'Implemented PostgreSQL atomic transactions with SERIALIZABLE isolation levels on credit balance updates.',
        impact: 'Achieved 100% financial ledger accuracy with zero balance discrepancies across months of operation.'
      },
      {
        challenge: 'Alerting pharmacists when critical life-saving medications went out of stock.',
        solution: 'Built an automated background event hook that monitors stock levels and triggers Firebase multicast push alerts to registered store devices.',
        impact: 'Zero prescription fulfillments lost due to unmonitored stock exhaustion.'
      }
    ],
    metrics: [
      { label: 'Ledger Accuracy', value: '100%', description: 'Flawless balance audit history' },
      { label: 'Active Pharmacies', value: '2 Stores', description: 'Live commercial retail deployment' },
      { label: 'Database Engine', value: 'PostgreSQL', description: 'Connection pooling & strict schemas' },
      { label: 'Code Status', value: 'Open Source', description: 'Available on Rohit\'s GitHub' }
    ],
    faqs: [
      {
        question: 'What does MediMate do?',
        answer: 'MediMate is a mobile app and backend system built for retail pharmacies. It manages customer medicine wishlists, out-of-stock inventory reorders, and customer credit ("Udhaar") accounts with automated transactional notifications.'
      },
      {
        question: 'What tech stack does MediMate utilize?',
        answer: 'MediMate is built with React Native and Redux Toolkit for the mobile client, Node.js and Express for the REST API, PostgreSQL for relational storage, Brevo for transactional email OTPs, and Firebase Admin SDK for push notifications.'
      },
      {
        question: 'Is MediMate\'s source code publicly available?',
        answer: 'Yes, MediMate\'s codebase is open-sourced on Rohit Chouhan\'s GitHub profile at https://github.com/RohitChauhan13/MediMate.git.'
      }
    ]
  },

  'payplus': {
    title: 'PayPlus',
    subtitle: 'Automated Employee Payroll, Hybrid Payment Splits & Tax Engine',
    metaTitle: 'PayPlus Case Study — Automated Payroll & Salary Calculation App | Rohit Chouhan',
    metaDescription: 'Enterprise payroll system engineered with React Native, Node.js, and Express by Rohit Chouhan. Automated hybrid payment splits, overtime rate calculators, and TDS calculations.',
    client: 'Commercial Enterprise Client / Open Source',
    role: 'Full Stack Engineer',
    platform: 'Android Mobile App & REST API Server',
    status: 'Production / Open Source on GitHub',
    githubUrl: 'https://github.com/RohitChauhan13/PayPlusApp.git',
    overview: 'PayPlus is an automated enterprise salary calculation and payroll management application. It solves complex compensation structures across daily, weekly, monthly, and custom date ranges, providing dynamic overtime adjustments, hybrid payment tracking (splitting cash vs. NEFT bank transfers), and automated TDS tax calculations with visual analytics.',
    architectureHighlights: [
      {
        title: 'Multi-Frequency Salary Calculation Engine',
        badge: 'Core Algorithms',
        description: 'Engineered a deterministic calculation engine that handles complex employee compensation rules, mid-cycle rate changes, unpaid leaves, and customized overtime coefficients.'
      },
      {
        title: 'Hybrid Cash & Online Payment Ledger',
        badge: 'Financial Tracking',
        description: 'Built specialized dual-entry accounting tracking payments split between instant cash disbursements and electronic bank transfers (NEFT/RTGS/UPI), preserving complete audit trails.'
      },
      {
        title: 'Tax Deducted at Source (TDS) Compliance',
        badge: 'Tax Computation',
        description: 'Automated statutory TDS deduction algorithms reflecting modern Indian tax slabs, generating comprehensive salary slips and breakdown summaries.'
      },
      {
        title: 'Interactive Financial Visualization',
        badge: 'Data Analytics',
        description: 'Integrated interactive charting components rendering payroll distributions, overtime expenses, and quarterly payroll trends directly on mobile screens.'
      }
    ],
    challenges: [
      {
        challenge: 'Handling mid-month employee pay-rate revisions without corrupting historical salary calculations.',
        solution: 'Implemented an effective-date timeline algorithm that splits calculation windows into discrete segments based on historical rate milestones.',
        impact: 'Eliminated manual recalculation errors and ensured 100% precision across retro-pay adjustments.'
      }
    ],
    metrics: [
      { label: 'Calculation Time', value: '< 2 sec', description: 'Instant multi-employee payroll run' },
      { label: 'Tax Accuracy', value: '100%', description: 'Statutory TDS precision' },
      { label: 'Payment Splits', value: 'Cash & NEFT', description: 'Dual ledger reconciliation' },
      { label: 'Repositories', value: '2 Repos', description: 'App and Server open-source on GitHub' }
    ],
    faqs: [
      {
        question: 'What problem does PayPlus solve?',
        answer: 'PayPlus automates employee payroll calculations, handles rate changes across custom date ranges, reconciles split cash and online payments, and computes statutory TDS deductions with graphical financial reporting.'
      },
      {
        question: 'Where can I view the PayPlus source code?',
        answer: 'The PayPlus client application is available at https://github.com/RohitChauhan13/PayPlusApp.git and the backend server is hosted at https://github.com/RohitChauhan13/PayPlusServer.git.'
      }
    ]
  },

  'rsf-enterprise-employee-management': {
    title: 'RSF — Enterprise Employee Management',
    subtitle: 'Biometric Face Verification, 24/7 Geotracking & Offline SQLite Sync',
    metaTitle: 'RSF Enterprise Case Study — Offline-First React Native & GPS Tracking | Rohit Chouhan',
    metaDescription: 'Enterprise employee tracking app featuring in-app face verification, 24/7 background location tracking with Google Maps SDK, and offline SQLite synchronization by Rohit Chouhan.',
    client: 'Enterprise Commercial Client / GTT Data Solutions',
    role: 'Lead Mobile Frontend Engineer',
    platform: 'Android Production Application (Google Play Console)',
    status: 'Pre-Production & Play Console Deployed',
    overview: 'RSF is an enterprise-scale workforce management and field security application. Rohit Chouhan engineered the React Native mobile client, integrating tamper-proof biometric facial verification, continuous 24/7 background location tracking using Google Maps SDK, and an offline-first SQLite database that caches location telemetry during cellular dropouts and batches chunked uploads upon reconnecting.',
    architectureHighlights: [
      {
        title: 'Tamper-Proof In-App Face Verification',
        badge: 'Biometrics & Security',
        description: 'Engineered an attendance verification system capturing facial biometric landmarks in-app for server-side neural validation, eliminating buddy-punching and fraudulent check-ins.'
      },
      {
        title: '24/7 Continuous Background GPS & Trip Tracking',
        badge: 'Geolocation Engine',
        description: 'Implemented persistent background geolocation tracking with Google Maps SDK, utilizing battery-conscious fused location providers, geofencing, and movement thresholds.'
      },
      {
        title: 'Offline-First SQLite Telemetry Queue',
        badge: 'Data Synchronization',
        description: 'Designed local SQLite storage to capture every coordinate and attendance log when offline. Developed an automated delta-sync service that uploads queued batches when connectivity returns.'
      },
      {
        title: 'Google Play Console Release Pipeline',
        badge: 'DevOps & Android',
        description: 'Configured production build signing, optimized ProGuard/R8 obfuscation, and published the enterprise application to Google Play Console testing tracks.'
      }
    ],
    challenges: [
      {
        challenge: 'Maintaining 24/7 background GPS tracking without aggressive Android battery killer termination.',
        solution: 'Built an Android foreground service with a persistent notification channel, dynamic location polling intervals based on accelerometer velocity, and low-power fused location APIs.',
        impact: 'Achieved continuous 8-hour shift tracking with less than 6% device battery drain.'
      },
      {
        challenge: 'Preventing location data loss in rural or underground areas with zero internet connectivity.',
        solution: 'Engineered an offline-first SQLite database that serializes breadcrumbs locally and synchronizes in batches via idempotent REST APIs once online.',
        impact: 'Zero telemetry coordinate loss recorded across thousands of field hours.'
      }
    ],
    metrics: [
      { label: 'GPS Precision', value: '< 5 meters', description: 'Fused location telemetry accuracy' },
      { label: 'Battery Impact', value: '< 6% / shift', description: 'Power-optimized background service' },
      { label: 'Offline Resilience', value: '100%', description: 'Local SQLite queue with batch sync' },
      { label: 'Deployment', value: 'Google Play', description: 'Shipped to Google Play Console' }
    ],
    faqs: [
      {
        question: 'What are the main features of the RSF application?',
        answer: 'RSF features biometric face verification for Day-In/Day-Out attendance, continuous 24/7 background and trip location tracking with Google Maps SDK, real-time push notifications via Firebase, and an offline-first SQLite sync engine.'
      },
      {
        question: 'How did Rohit Chouhan implement offline-first synchronization in RSF?',
        answer: 'Rohit used SQLite to store attendance logs and GPS coordinates locally on the device when offline. An automated background listener detects network restoration and dispatches idempotent chunked REST API calls to synchronize data with the server.'
      }
    ]
  },

  'ticket-khidakee': {
    title: 'Ticket Khidakee',
    subtitle: 'High-Performance Native Interactive Seating Engine (Rebuilt from WebView)',
    metaTitle: 'Ticket Khidakee Case Study — Native React Native Seating Engine | Rohit Chouhan',
    metaDescription: 'How Rohit Chouhan re-architected Ticket Khidakee\'s event ticketing seat selection from a laggy WebView into a 60fps native React Native canvas, reducing memory by 70%.',
    client: 'Event Ticketing Commercial Platform / GTT Data Solutions',
    role: 'Lead UI Architecture Engineer',
    platform: 'Android & iOS Mobile Application',
    status: 'Live Commercial Event Platform',
    liveUrl: 'https://www.ticketkhidakee.com/',
    overview: 'Ticket Khidakee is an event ticket booking mobile platform. Originally engineered with an embedded WebView-based seating chart that suffered from severe lag, high memory consumption, and missed touch gestures, Rohit Chouhan completely re-architected and rebuilt the interactive seating selection system using pure native React Native code, delivering a fluid 60fps reservation experience.',
    architectureHighlights: [
      {
        title: 'Pure Native Seating Canvas Architecture',
        badge: 'UI Engineering',
        description: 'Replaced legacy HTML/WebView rendering with pure native React Native components, using optimized grid mathematics to calculate dynamic seat coordinates, aisles, VIP sections, and stage orientation.'
      },
      {
        title: 'Virtualization & High-Concurrency Re-renders',
        badge: 'Performance',
        description: 'Engineered memoized seat clusters and windowed viewport calculations, rendering hundreds of interactive seat nodes simultaneously without dropping frames on budget Android devices.'
      },
      {
        title: 'Multi-Touch Pan, Zoom & Seat Selection',
        badge: 'Gesture Handler',
        description: 'Integrated react-native-gesture-handler and reanimated physics to deliver intuitive pinch-to-zoom and frictionless drag navigation across expansive stadium floorplans.'
      },
      {
        title: 'Real-Time Reservation State Lockouts',
        badge: 'Concurrency',
        description: 'Integrated high-speed WebSocket and REST status synchronization, locking selected seats in real-time to prevent race conditions during high-demand concert ticket drops.'
      }
    ],
    challenges: [
      {
        challenge: 'Legacy WebView seating map took 4+ seconds to load and dropped frames during pinch-to-zoom.',
        solution: 'Completely eliminated WebView in favor of native React Native components with memoized render blocks and bounding-box touch collision math.',
        impact: 'Cut load time from 4000ms to under 180ms and achieved consistent 60fps interaction.'
      },
      {
        challenge: 'High memory consumption caused out-of-memory crashes on low-RAM Android smartphones.',
        solution: 'Implemented viewport virtualization, rendering high-detail seat graphics only for visible clusters while keeping off-screen areas lightweight in memory.',
        impact: 'Decreased memory consumption by 70%, completely ending out-of-memory crash reports.'
      }
    ],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS', description: 'Smooth native pan and pinch-zoom' },
      { label: 'Memory Saved', value: '70%', description: 'Reduction compared to legacy WebView' },
      { label: 'Load Time', value: '< 180ms', description: 'Instant native seat layout render' },
      { label: 'Platform', value: 'Live', description: 'Powers ticketkhidakee.com ticketing' }
    ],
    faqs: [
      {
        question: 'What was Rohit Chouhan\'s technical contribution to Ticket Khidakee?',
        answer: 'Rohit Chouhan re-architected the entire interactive seat selection system from scratch in pure native React Native code, replacing an unperformant WebView implementation. His native architecture eliminated lag, enabled 60fps pan/zoom gestures, and cut memory usage by 70%.'
      },
      {
        question: 'Where can I see Ticket Khidakee in action?',
        answer: 'You can visit the official Ticket Khidakee ticketing platform at https://www.ticketkhidakee.com/.'
      }
    ]
  },

  'mahagps': {
    title: 'MahaGPS',
    subtitle: 'Real-Time Vehicle Fleet Telematics & Android 16KB Page Compliance',
    metaTitle: 'MahaGPS Case Study — Vehicle Telematics & Play Console Deployment | Rohit Chouhan',
    metaDescription: 'MahaGPS fleet tracking case study: Production React Native mobile app, Google Maps telemetry, Android 16KB page-size compliance migration, and Play Console release by Rohit Chouhan.',
    client: 'Fleet Logistics Commercial Client / GTT Data Solutions',
    role: 'Mobile Systems & Release Engineer',
    platform: 'Android Production Application',
    status: 'Google Play Store Deployed',
    overview: 'MahaGPS is a real-time vehicle telematics and fleet tracking application that visualizes live commercial vehicle fleets, route histories, and speed alerts. Rohit Chouhan contributed to the core mobile codebase, led native library audits for Google\'s mandatory Android 16KB memory page-size compliance, and executed production deployments to the Google Play Console.',
    architectureHighlights: [
      {
        title: 'Live Telemetry Vehicle Tracking Map',
        badge: 'Real-Time UI',
        description: 'Engineered smooth vehicle marker animations interpolating between live GPS coordinate updates with heading rotation to reflect real-world vehicle motion.'
      },
      {
        title: 'Android 16KB Memory Page-Size Audit & Migration',
        badge: 'Android Engineering',
        description: 'Spearheaded binary ELF alignment audits across native C/C++ libraries and map SDKs to ensure seamless execution on modern Android devices with 16KB page sizes.'
      },
      {
        title: 'Google Play Console Release Pipeline',
        badge: 'Release Management',
        description: 'Managed production App Bundles (AAB), signing keystores, policy compliance checks, and rollout tracks on Google Play Console.'
      }
    ],
    challenges: [
      {
        challenge: 'Migrating native map libraries to comply with Google\'s new 16KB page-size requirements.',
        solution: 'Audited all third-party native dependencies, replaced outdated binary SO libraries with 16KB-aligned compiled variants, and validated memory alignment using Android 15 emulator targets.',
        impact: 'Passed Google Play Console 16KB compatibility verification with zero regressions.'
      }
    ],
    metrics: [
      { label: 'Compliance', value: '16KB Aligned', description: 'Full Android 16KB page-size support' },
      { label: 'Marker Latency', value: '< 250ms', description: 'Smooth interpolated vehicle movement' },
      { label: 'Distribution', value: 'Google Play', description: 'Shipped to Google Play Console' }
    ],
    faqs: [
      {
        question: 'What is MahaGPS?',
        answer: 'MahaGPS is an enterprise commercial vehicle tracking and fleet telematics mobile application deployed on the Google Play Console.'
      },
      {
        question: 'What was Rohit Chouhan\'s role in MahaGPS?',
        answer: 'Rohit Chouhan contributed to the mobile application development, led native library audits for Android 16KB page-size compliance, and handled deployment to the Google Play Console.'
      }
    ]
  },

  'draft-career': {
    title: 'Draft Career — AI Resume Builder',
    subtitle: 'AI-Powered Intelligent Career Document Engine',
    metaTitle: 'Draft Career Case Study — AI Resume Builder Web Application | Rohit Chouhan',
    metaDescription: 'Draft Career case study: Modern AI-assisted resume builder web application built with React and Next.js by Rohit Chouhan. Explores modern AI workflows and responsive UX.',
    client: 'Personal Innovation Build',
    role: 'Solo Creator & Full Stack Developer',
    platform: 'Web Application (Next.js / Vercel)',
    status: 'Live on Vercel',
    liveUrl: 'https://draft-career.vercel.app/',
    overview: 'Draft Career is an exploratory AI-assisted resume builder application created by Rohit Chouhan to pioneer modern AI-assisted engineering workflows. The platform helps developers and job seekers transform rough project descriptions and work histories into ATS-optimized, high-impact career portfolios.',
    architectureHighlights: [
      {
        title: 'Intelligent Resume Formatting & AI Parsing',
        badge: 'AI Integration',
        description: 'Integrates modern LLM endpoints to parse unstructured career summaries, extract quantifiable achievements, and structure content into ATS-compliant bullet points.'
      },
      {
        title: 'Real-Time Reactive Document Preview',
        badge: 'Frontend Systems',
        description: 'Engineered a split-screen reactive markdown preview that re-renders styled resume templates dynamically as users modify information.'
      },
      {
        title: 'Modern High-Performance Web Architecture',
        badge: 'Web Stack',
        description: 'Built with React and Next.js, leveraging server components, fast hydration, and deployed globally on Vercel edge infrastructure.'
      }
    ],
    challenges: [
      {
        challenge: 'Maintaining instant UI feedback during heavy AI text generation streams.',
        solution: 'Implemented streaming responses with chunked token rendering to display recommendations progressively.',
        impact: 'Zero perceived latency for users crafting resume summaries.'
      }
    ],
    metrics: [
      { label: 'Deployment', value: 'Vercel Edge', description: 'Global sub-second edge distribution' },
      { label: 'Format Output', value: 'ATS Compliant', description: 'Optimized for recruiter screeners' },
      { label: 'Status', value: 'Live Online', description: 'Available at draft-career.vercel.app' }
    ],
    faqs: [
      {
        question: 'What is Draft Career?',
        answer: 'Draft Career is an AI-powered resume builder web application engineered by Rohit Chouhan that generates ATS-friendly resumes and career summaries.'
      },
      {
        question: 'Where can I access Draft Career?',
        answer: 'You can test Draft Career live at https://draft-career.vercel.app/.'
      }
    ]
  },

  'rag-bot': {
    title: 'RAG Bot',
    subtitle: 'Autonomous Retrieval-Augmented Generation Knowledge Assistant',
    metaTitle: 'RAG Bot Case Study — Knowledge Base Conversational AI & Azure VM | Rohit Chouhan',
    metaDescription: 'RAG Bot case study: Retrieval-Augmented Generation AI assistant built with Node.js and vector search, deployed on Microsoft Azure VM with Caddy reverse proxy by Rohit Chouhan.',
    client: 'Personal Autonomous Portfolio Agent',
    role: 'AI Systems & Backend Architect',
    platform: 'Conversational AI / Node.js API / Azure Cloud',
    status: 'Active on Portfolio Website',
    overview: 'RAG Bot is an autonomous Retrieval-Augmented Generation chatbot engineered by Rohit Chouhan to act as an authoritative 24/7 AI representative on his portfolio website. Built with Node.js, Express, vector similarity retrieval, and deployed on an Azure Windows VM reverse-proxied by Caddy, it answers technical and professional recruiter questions with zero hallucination.',
    architectureHighlights: [
      {
        title: 'Grounded Retrieval-Augmented Knowledge Engine',
        badge: 'AI Architecture',
        description: 'Extracts and embeds factual professional documentation from Rohit\'s career knowledge base. Performs semantic vector similarity search to supply verified context windows into LLM prompts.'
      },
      {
        title: 'Anti-Hallucination Guardrails & Source Verification',
        badge: 'Prompt Engineering',
        description: 'Engineered strict system prompts that constrain the model to verified facts, eliminating hallucinations and citing exact projects and repositories.'
      },
      {
        title: 'Abuse Mitigation & Rate Limiting',
        badge: 'Security',
        description: 'Integrated client fingerprinting, session isolation, and IP-based rate limiting to prevent spam and protect cloud API credits.'
      },
      {
        title: 'Azure Cloud & Caddy Reverse Proxy Deployment',
        badge: 'Infrastructure',
        description: 'Hosted on a Microsoft Azure Windows VM co-located with DuckDNS and Caddy, delivering automated SSL and low-latency API response times.'
      }
    ],
    challenges: [
      {
        challenge: 'Eliminating hallucinations when recruiters ask specific questions about technical proficiencies.',
        solution: 'Constructed a curated knowledge bundle with strict system prompt boundaries requiring the model to decline queries outside verified documentation.',
        impact: 'Achieved 100% factual fidelity on professional and project answers.'
      }
    ],
    metrics: [
      { label: 'Factual Accuracy', value: '100%', description: 'Zero hallucination on career history' },
      { label: 'Hosting', value: 'Azure VM', description: 'Self-hosted Caddy reverse proxy' },
      { label: 'Availability', value: '24/7', description: 'Embedded on portfolio chat widget' }
    ],
    faqs: [
      {
        question: 'What is RAG Bot?',
        answer: 'RAG Bot is a Retrieval-Augmented Generation chatbot built by Rohit Chouhan to answer visitor and recruiter questions about his experience, skills, and projects with 100% verified accuracy.'
      },
      {
        question: 'Where is RAG Bot hosted?',
        answer: 'RAG Bot\'s backend runs on a self-managed Microsoft Azure Windows Virtual Machine using Node.js, DuckDNS, and Caddy reverse proxy.'
      }
    ]
  }
};
