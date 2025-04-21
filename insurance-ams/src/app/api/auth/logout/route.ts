import { destroySessionCookie } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  destroySessionCookie();
  return NextResponse.json({ message: 'Logged out' });
}
