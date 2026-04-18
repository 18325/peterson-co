import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the directory exists
const dbPath = path.join(process.cwd(), 'data', 'database.sqlite');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize the schema
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,           -- local unique ID or FedaPay ID
    fedapay_id INTEGER,            -- ID from FedaPay
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    amount INTEGER NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, declined, canceled
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
