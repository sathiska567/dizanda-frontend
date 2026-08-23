import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { createId } from '../utils/id.js';
import { buildDefaultData } from './defaultData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE = join(__dirname, 'db.json');

// All reads/writes go through this module so concurrent requests never
// interleave partial writes to db.json. Writes are queued and applied
// one at a time (in-process — fine for a single-instance admin API).
let writeQueue = Promise.resolve();
let cache = null;

function ensureFile() {
  if (!existsSync(DB_FILE)) {
    mkdirSync(dirname(DB_FILE), { recursive: true });
    writeFileSync(DB_FILE, JSON.stringify(buildDefaultData(), null, 2));
  }
}

function load() {
  if (cache) return cache;
  ensureFile();
  cache = JSON.parse(readFileSync(DB_FILE, 'utf-8'));
  return cache;
}

function persist(data) {
  cache = data;
  writeQueue = writeQueue.then(
    () => writeFileSync(DB_FILE, JSON.stringify(data, null, 2)),
  );
  return writeQueue;
}

export async function seedAdminIfNeeded() {
  const data = load();
  if (data.admins.length > 0) return;

  const passwordHash = await bcrypt.hash(env.adminPassword, 10);
  data.admins.push({
    id: createId(),
    name: env.adminName,
    email: env.adminEmail.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  });
  await persist(data);
  // eslint-disable-next-line no-console
  console.log(`Seeded initial admin account: ${env.adminEmail}`);
}

export const db = {
  read() {
    return load();
  },
  async write(mutator) {
    const data = load();
    const result = mutator(data);
    await persist(data);
    return result;
  },
};
