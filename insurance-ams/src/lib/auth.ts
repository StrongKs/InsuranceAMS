import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secret = 'secret'
if (!secret) throw new Error('AUTH_SECRET is not defined in environment');

const key = new TextEncoder().encode(secret);
const algorithm = 'HS256';

type SessionPayload = {
  userId: string;
  role: string;
  email?: string;
  exp?: number;
};

// encryption
export async function sign(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('7d') 
    .sign(key);
}

// verification
export async function verify(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as SessionPayload;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}

// create a cookie
export async function createSessionCookie(payload: SessionPayload) {
  const token = await sign(payload);
  cookies().set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
}

//log out
export function destroySessionCookie() {
  cookies().set('token', '', {
    path: '/',
    expires: new Date(0),
  });
}

// current session
export async function getSession(): Promise<SessionPayload | null> {
    const token = cookies().get('token')?.value;
    console.log('token in getSession:', token);
    if (!token) return null;
  
    try {
      const { payload } = await jwtVerify(token, key);
      return payload as { userId: string; role: string; email?: string };
    } catch (err) {
      return null;
    }
}

// potentially refresh cookies if you log out
export async function refreshSession(request: NextRequest) {
  const oldToken = request.cookies.get('token')?.value;
  if (!oldToken) return;

  const session = await verify(oldToken);
  if (!session) return;

  const newToken = await sign(session);

  const res = NextResponse.next();
  res.cookies.set('token', newToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res;
}
