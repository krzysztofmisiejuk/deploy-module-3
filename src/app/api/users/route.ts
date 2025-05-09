import { getUsers } from '@/lib/db'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const internalRequest = req.headers.get('x-internal-api-call');

  if (!internalRequest) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await getUsers();
    if (!users) {
      return Response.json({ error: 'Users not found' }, { status: 404 });
    }
    return Response.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
