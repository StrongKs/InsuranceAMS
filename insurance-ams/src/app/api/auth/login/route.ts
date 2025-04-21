import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '../../../../../prisma/db_Scripts/createDefaultClient';
import { createSessionCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';

//secret 
const JWT_SECRET = process.env.JWT_SECRET || 'plaintext_test_secret';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    //find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // compare plaintext password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // sign JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    await createSessionCookie({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

