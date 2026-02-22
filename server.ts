import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("schools.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS schools (
    id TEXT PRIMARY KEY,
    data TEXT
  )
`);

// Seed if empty
const count = db.prepare("SELECT count(*) as count FROM schools").get() as { count: number };
if (count.count === 0) {
    console.log("Seeding initial data...");
    const initialData = [
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
        facilities: ["Spacious campus", "Modern setup", "Green area", "Peaceful vibe", "Smart classrooms", "Library", "Labs", "Sports grounds"],
        admissions: {
          process: "Open for Nursery to XI. Visit office ya online apply.",
          link: "https://esteem.nexterp.in/nlp/nlp/admission-login"
        },
        faculty: [{ name: "Tinku Kumar", role: "Principal" }, { name: "Dr. Manoj Kumar Jha", role: "Chairman" }],
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
        location: { lat: 22.8046, lng: 86.2029 }
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
        facilities: ["Private building", "10 good classrooms", "Pucca wall boundary", "Electricity", "Hand pumps (functional)", "Separate toilets for boys/girls", "Playground", "Library", "Functional computers"],
        admissions: { process: "No details, school se contact kar." },
        faculty: [{ name: "11 Teachers", role: "Teaching Staff" }],
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
        facilities: ["Smart classrooms", "Library (books/e-resources)", "Science/computer labs", "Sports (indoor/outdoor)", "Bus facility", "Hostel", "CCTV", "Health check-ups"],
        admissions: { process: "No website details, school se contact for process." },
        faculty: [{ name: "Qualified Staff", role: "Experienced Teachers" }],
        contact: {
          phone: ["9279777848", "9379777848", "8810277815"],
          email: ["bmdav.skla@gmail.com"],
          address: "Anjani Nagar, Seraikela, Jharkhand 833219",
          website: "https://bmdavskla.org/"
        },
        achievements: [{ title: "User Rating", value: "4.8/5" }],
        location: { lat: 22.804, lng: 85.891 }
      }
    ];

    const insert = db.prepare("INSERT OR REPLACE INTO schools (id, data) VALUES (?, ?)");
    for (const school of initialData) {
      insert.run(school.id, JSON.stringify(school));
    }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/schools", (req, res) => {
    const rows = db.prepare("SELECT * FROM schools").all();
    if (rows.length === 0) {
        return res.json([]);
    }
    res.json(rows.map(row => JSON.parse(row.data as string)));
  });

  app.post("/api/schools", (req, res) => {
    const school = req.body;
    const stmt = db.prepare("INSERT OR REPLACE INTO schools (id, data) VALUES (?, ?)");
    stmt.run(school.id, JSON.stringify(school));
    res.json({ success: true });
  });

  app.post("/api/upload-memory", (req, res) => {
    // In a real app, we'd handle file uploads here (e.g., multer + S3)
    console.log("Memory upload received:", req.body);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
