import { promises as fs } from 'fs';
import path from 'path';
import { Product, Category, Order } from '@/types';
import { products as seedProducts, categories as seedCategories, sampleOrders } from '@/lib/data';

export interface StoreData {
  products: Product[];
  categories: Category[];
  orders: Order[];
}

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');

export async function writeStoreFile(data: StoreData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readStoreFile(): Promise<StoreData> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    const seed: StoreData = { products: seedProducts, categories: seedCategories, orders: sampleOrders };
    await writeStoreFile(seed);
    return seed;
  }
}
