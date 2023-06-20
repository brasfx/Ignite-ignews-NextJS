import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { params: string } },
) {
  const id = params.params;

  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Marian' },
    { id: 3, name: 'Mary' },
  ];

  return NextResponse.json(users);
}
