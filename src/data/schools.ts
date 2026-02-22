export interface Achievement {
  title: string;
  value: string;
}

export interface Faculty {
  name: string;
  role: string;
}

export interface BranchData {
  id: string;
  name: string;
  shortName: string;
  overview: string;
  history: string;
  mission: string;
  vision: string;
  academics: {
    classes: string;
    approach: string;
    extra?: string;
    curriculum?: string;
  };
  facilities: string[];
  admissions: {
    process: string;
    link?: string;
  };
  faculty: Faculty[];
  contact: {
    phone: string[];
    email: string[];
    address: string;
    udise?: string;
    website?: string;
    paymentLink?: string;
    tcLink?: string;
  };
  achievements?: Achievement[];
  events?: string[];
  location: {
    lat: number;
    lng: number;
  };
  videoUrl?: string;
}

export const schoolsData: BranchData[] = [
  {
    id: "chaliyama",
    name: "Esteem Public School - Chaliyama Branch",
    shortName: "EPS Chaliyama",
    overview: "Established 24 March 2012, co-educational English medium school. Location: Chaliyama, Saraikela-Kharsawan district (35 km from Jamshedpur), peaceful area.",
    history: "Founded by Dr. Manoj Kumar Jha (socialist, visionary). Campus: 2+ acres, hi-tech buildings, green lawns, CBSE affiliated. Focus: Student-centered learning, projects, discovery, personality development with tech aur culture mix.",
    vision: "Quality education for intellectual, social, cultural growth; confident individuals.",
    mission: "Day-to-day skills, physical growth, relationships, economic sense, lifelong learning, safe environment.",
    academics: {
      classes: "Nursery to XII, CBSE based.",
      approach: "Value-based, holistic, board exams prep (AISSE Class X, AISSCE XII).",
      extra: "Projects, tech integration, co-scholastic activities."
    },
    facilities: [
      "Spacious campus",
      "Modern setup",
      "Green area",
      "Peaceful vibe",
      "Smart classrooms",
      "Library",
      "Labs",
      "Sports grounds"
    ],
    admissions: {
      process: "Open for Nursery to XI. Visit office ya online apply.",
      link: "https://esteem.nexterp.in/nlp/nlp/admission-login"
    },
    faculty: [
      { name: "Tinku Kumar", role: "Principal" },
      { name: "Dr. Manoj Kumar Jha", role: "Chairman" }
    ],
    contact: {
      phone: ["6207753060"],
      email: ["epscbsa@gmail.com"],
      address: "Chaliyama, Keshargaria, Saraikela Kharsawan, Jharkhand, PIN 833219",
      udise: "20201800903",
      paymentLink: "http://esteempublicschool.co.in/online_payment.php",
      tcLink: "http://esteempublicschool.co.in/tc.php"
    },
    achievements: [
      { title: "AISSE 2025 (X) Topper", value: "Ritima Singh 91%" },
      { title: "AISSE 2025 (X) Topper", value: "Namrata 91%" },
      { title: "AISSCE 2025 (XII) Topper", value: "Drishya Kumar 91%" },
      { title: "AISSCE 2025 (XII) Topper", value: "Faiz 86%" }
    ],
    events: [
      "Literary activities",
      "Creative workshops",
      "Games & Sports",
      "Computer classes",
      "Saraswati Puja",
      "Makar Sankranti"
    ],
    location: { lat: 22.8046, lng: 86.2029 },
    videoUrl: "https://youtu.be/9IRIqktnCWg"
  },
  {
    id: "tungri",
    name: "Esteem Public School - Tungri Branch",
    shortName: "EPS Tungri",
    overview: "Established 2013, co-educational English medium school with pre-primary. Managed by Unrecognised (not CBSE yet?).",
    history: "Nature: N/A, no mid-day meal. Rating: 4.1/10 reviews pe.",
    vision: "Value-based, holistic development.",
    mission: "Quality education for intellectual, social, cultural growth; confident individuals.",
    academics: {
      classes: "1 to 8 (pre-primary attached).",
      approach: "Medium: English. Session: April start. Board: N/A for 10/12.",
      curriculum: "Teachers: 11 total (4 male, 7 female), 4 pre-primary."
    },
    facilities: [
      "Private building",
      "10 good classrooms",
      "Pucca wall boundary",
      "Electricity",
      "Hand pumps (functional)",
      "Separate toilets for boys/girls",
      "Playground",
      "Library",
      "Functional computers"
    ],
    admissions: {
      process: "No details, school se contact kar."
    },
    faculty: [
      { name: "11 Teachers", role: "Teaching Staff" }
    ],
    contact: {
      phone: ["Contact school directly"],
      email: ["Contact school directly"],
      address: "Tungari, Sadar Chaibasa, Pashchimi Singhbhum, Jharkhand, PIN 833201",
      udise: "20171908602"
    },
    location: { lat: 22.365, lng: 85.801 }
  },
  {
    id: "bmdav",
    name: "B.M. DAV Public School",
    shortName: "BM DAV",
    overview: "Part of DAV network, legacy of excellence. Location: Anjani Nagar, Seraikela, Saraikela-Kharsawan, Jharkhand 833219.",
    history: "CBSE affiliated (AF), Govt. Jharkhand approved, Aryasamaj member. English medium, co-educational. Focus: Academic excellence, holistic development, innovation for future leaders.",
    vision: "Empower students with knowledge, skills, confidence for global challenges, rooted in ethics aur integrity.",
    mission: "Provide a comprehensive learning environment that fosters critical thinking and creativity.",
    academics: {
      classes: "Nursery to higher (XII assume).",
      approach: "Comprehensive, critical thinking, creativity. Nursery-UKG: Activity-based.",
      extra: "Tech: TATA Edge smart classes."
    },
    facilities: [
      "Smart classrooms",
      "Library (books/e-resources)",
      "Science/computer labs",
      "Sports (indoor/outdoor)",
      "Bus facility",
      "Hostel",
      "CCTV",
      "Health check-ups"
    ],
    admissions: {
      process: "No website details, school se contact for process."
    },
    faculty: [
      { name: "Qualified Staff", role: "Experienced Teachers" }
    ],
    contact: {
      phone: ["9279777848", "9379777848", "8810277815"],
      email: ["bmdav.skla@gmail.com"],
      address: "Anjani Nagar, Seraikela, Jharkhand 833219",
      website: "https://bmdavskla.org/"
    },
    achievements: [
      { title: "User Rating", value: "4.8/5" }
    ],
    events: [
      "Debates",
      "Quizzes",
      "Literary events",
      "Music & Dance",
      "Yoga & Meditation",
      "Sports tournaments"
    ],
    location: { lat: 22.804, lng: 85.891 }
  }
];
