import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { PRODUCTS as SEED_PRODUCTS, CATEGORIES } from './mockData.js';

const DATA_DIR = join(process.cwd(), 'data');
const PRODUCTS_FILE = join(DATA_DIR, 'products.json');
const ORDERS_FILE = join(DATA_DIR, 'orders.json');

function ensureDir() {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

export function getProducts() {
  try {
    if (!ensureDir()) return [...SEED_PRODUCTS];
    if (!existsSync(PRODUCTS_FILE)) {
      writeFileSync(PRODUCTS_FILE, JSON.stringify(SEED_PRODUCTS, null, 2), 'utf-8');
      return [...SEED_PRODUCTS];
    }
    return JSON.parse(readFileSync(PRODUCTS_FILE, 'utf-8'));
  } catch {
    return [...SEED_PRODUCTS];
  }
}

export function saveProducts(products) {
  try {
    ensureDir();
    writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

export function getOrders() {
  try {
    if (!ensureDir()) return [];
    if (!existsSync(ORDERS_FILE)) return [];
    return JSON.parse(readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

export function saveOrders(orders) {
  try {
    ensureDir();
    writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

export { CATEGORIES };
