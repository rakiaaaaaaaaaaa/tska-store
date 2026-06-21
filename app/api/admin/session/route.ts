import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-session';

export async function GET() {
  return NextResponse.json({ authenticated: isAdminAuthenticated() });
}
