import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { PRODUCTS as SEED_PRODUCTS, CATEGORIES } from './mockData.js';

const DATA_DIR = join(process.cwd(), 'data');
const PRODUCTS_FILE = join(DATA_DIR, 'products.json');
const ORDERS_FILE = join(DATA_DIR, 'orders.json');

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function getProducts() {
  ensureDir();
  if (!existsSync(PRODUCTS_FILE)) {
    writeFileSync(PRODUCTS_FILE, JSON.stringify(SEED_PRODUCTS, null, 2), 'utf-8');
    return [...SEED_PRODUCTS];
  }
  try {
    return JSON.parse(readFileSync(PRODUCTS_FILE, 'utf-8'));
  } catch {
    return [...SEED_PRODUCTS];
  }
}

export function saveProducts(products) {
  ensureDir();
  writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

export function getOrders() {
  ensureDir();
  if (!existsSync(ORDERS_FILE)) return [];
  try {
    return JSON.parse(readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

export function saveOrders(orders) {
  ensureDir();
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

export { CATEGORIES };
