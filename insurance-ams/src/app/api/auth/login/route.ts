import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '../../../../../prisma/db_Scripts/createDefaultClient';

// Use your own secret from .env or a placeholder
const JWT_SECRET = process.env.JWT_SECRET || 'plaintext_test_secret';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Compare plaintext password
    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Sign JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Send token in an httpOnly cookie + return role
    const response = NextResponse.json({ role: user.role });
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
