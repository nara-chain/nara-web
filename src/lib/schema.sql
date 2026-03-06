CREATE TABLE IF NOT EXISTS agent_stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  tx_count INTEGER NOT NULL DEFAULT 0,
  last_tx TEXT DEFAULT NULL
);
INSERT OR IGNORE INTO agent_stats (id) VALUES (1);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tx_signature TEXT NOT NULL UNIQUE,
  agent_id TEXT NOT NULL,
  authority TEXT NOT NULL,
  model TEXT NOT NULL,
  activity TEXT NOT NULL,
  log TEXT NOT NULL,
  referral_id TEXT,
  points_earned INTEGER NOT NULL DEFAULT 0,
  referral_points_earned INTEGER NOT NULL DEFAULT 0,
  nara_amount REAL NOT NULL DEFAULT 0,
  block_time INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  zk_type TEXT,
  zk_proof_hash TEXT
);
CREATE INDEX IF NOT EXISTS idx_activity_block_time ON activity_logs(block_time);

CREATE TABLE IF NOT EXISTS agent_ids (
  agent_id TEXT PRIMARY KEY,
  last_active_at INTEGER NOT NULL
);
