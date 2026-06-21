import { NextResponse } from 'next/server';
import { readStoreFile, writeStoreFile } from '@/lib/store-db';
import { Order } from '@/types';

// Public endpoint: customers placing an order at checkout don't have an
// admin session, unlike the catalog-management writes in app/api/store/route.ts.
export async function POST(request: Request) {
  const order: Order = await request.json();
  const data = await readStoreFile();
  data.orders = [...data.orders, order];
  await writeStoreFile(data);
  return NextResponse.json({ ok: true });
}
