import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'plaintext_test_secret';

async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    if (payload.role !== 'Admin') {
      redirect('/login');
    }
  } catch (error) {
    // If token invalid, redirect
    redirect('/login');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Page</h1>
      <p>You can view this Admin Page.</p>
    </div>
  );
}

export default AdminPage;