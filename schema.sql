CREATE TABLE IF NOT EXISTS rsvps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 0,
  dietary TEXT,
  message TEXT,
  created_at TEXT NOT NULL
);
