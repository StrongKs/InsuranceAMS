import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';


async function AgentPage() {
  const session = await getSession();
  
    if (!session || session.role !== 'Admin') {
      redirect('/login');
    }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Agent Page</h1>
      <p>You can view this Agent page.</p>
    </div>
  );
}

export default AgentPage;