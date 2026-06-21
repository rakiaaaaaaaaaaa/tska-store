import { NextResponse } from 'next/server';
import { readStoreFile, writeStoreFile, StoreData } from '@/lib/store-db';

export async function GET() {
  const data = await readStoreFile();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body: StoreData = await request.json();
  await writeStoreFile(body);
  return NextResponse.json({ ok: true });
}
