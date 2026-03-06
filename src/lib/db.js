import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

let _db = null;

export function getDb() {
  if (_db) return _db;

  const dbPath = join(process.cwd(), 'data', 'nara.db');
  const sqlite = new Database(dbPath);
  sqlite.pragma('journal_mode = WAL');

  // Run schema
  const schema = readFileSync(join(process.cwd(), 'src', 'lib', 'schema.sql'), 'utf-8');
  sqlite.exec(schema);

  // Migrations for existing DBs
  const cols = sqlite.prepare('PRAGMA table_info(activity_logs)').all().map(c => c.name);
  if (!cols.includes('zk_type')) sqlite.exec('ALTER TABLE activity_logs ADD COLUMN zk_type TEXT');
  if (!cols.includes('zk_proof_hash')) sqlite.exec('ALTER TABLE activity_logs ADD COLUMN zk_proof_hash TEXT');

  _db = {
    run(sql, params = []) {
      return sqlite.prepare(sql).run(...params);
    },
    all(sql, params = []) {
      return sqlite.prepare(sql).all(...params);
    },
    get(sql, params = []) {
      return sqlite.prepare(sql).get(...params);
    },
    raw: sqlite,
  };

  return _db;
}
