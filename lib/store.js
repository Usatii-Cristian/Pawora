import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { PRODUCTS as SEED_PRODUCTS, CATEGORIES } from './mockData.js';
import { ARTICLES as SEED_ARTICLES } from './seedArticles.js';

const DATA_DIR = join(process.cwd(), 'data');
const PRODUCTS_FILE = join(DATA_DIR, 'products.json');
const ORDERS_FILE = join(DATA_DIR, 'orders.json');
const MESSAGES_FILE = join(DATA_DIR, 'messages.json');
const ARTICLES_FILE = join(DATA_DIR, 'articles.json');

function ensureDir() {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

function readJson(file, fallback, { seedIfMissing = false } = {}) {
  try {
    if (!ensureDir()) return typeof fallback === 'function' ? fallback() : fallback;
    if (!existsSync(file)) {
      const seed = typeof fallback === 'function' ? fallback() : fallback;
      if (seedIfMissing) writeFileSync(file, JSON.stringify(seed, null, 2), 'utf-8');
      return seed;
    }
    return JSON.parse(readFileSync(file, 'utf-8'));
  } catch {
    return typeof fallback === 'function' ? fallback() : fallback;
  }
}

function writeJson(file, data) {
  try {
    ensureDir();
    writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

// ── Produse ──
export function getProducts() {
  return readJson(PRODUCTS_FILE, () => [...SEED_PRODUCTS], { seedIfMissing: true });
}
export function saveProducts(products) {
  return writeJson(PRODUCTS_FILE, products);
}

// ── Comenzi ──
export function getOrders() {
  return readJson(ORDERS_FILE, []);
}
export function saveOrders(orders) {
  return writeJson(ORDERS_FILE, orders);
}

// ── Mesaje contact ──
export function getMessages() {
  return readJson(MESSAGES_FILE, []);
}
export function saveMessages(messages) {
  return writeJson(MESSAGES_FILE, messages);
}

// ── Articole blog ──
export function getArticles() {
  return readJson(ARTICLES_FILE, () => [...SEED_ARTICLES], { seedIfMissing: true });
}
export function saveArticles(articles) {
  return writeJson(ARTICLES_FILE, articles);
}

export { CATEGORIES };
