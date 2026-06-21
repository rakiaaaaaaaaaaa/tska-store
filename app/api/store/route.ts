import { NextResponse } from 'next/server';
import { readStoreFile, writeStoreFile, StoreData } from '@/lib/store-db';
import { isAdminAuthenticated } from '@/lib/admin-session';

export async function GET() {
  const data = await readStoreFile();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body: StoreData = await request.json();
  await writeStoreFile(body);
  return NextResponse.json({ ok: true });
}
