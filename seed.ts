import Database from "better-sqlite3";
import { schoolsData } from "./src/data/schools.ts";

const db = new Database("schools.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS schools (
    id TEXT PRIMARY KEY,
    data TEXT
  )
`);

const insert = db.prepare("INSERT OR REPLACE INTO schools (id, data) VALUES (?, ?)");

for (const school of schoolsData) {
  insert.run(school.id, JSON.stringify(school));
}

console.log("Database seeded successfully!");
