/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PB_API_URL, PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } from '../../../lib/constants';

export async function GET() {
  try {
    const authResponse = await fetch(`${PB_API_URL}/api/admins/auth-with-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: PB_ADMIN_EMAIL, password: PB_ADMIN_PASSWORD }),
    });

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      throw new Error(`PocketBase admin auth failed: ${authResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    const collectionsResponse = await fetch(`${PB_API_URL}/api/collections`, {
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });

    if (!collectionsResponse.ok) {
      throw new Error(`PocketBase responded with status: ${collectionsResponse.status}`);
    }

    const data = await collectionsResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching collections from PocketBase:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Collection name is required' }, { status: 400 });
    }

    const authResponse = await fetch(`${PB_API_URL}/api/admins/auth-with-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: PB_ADMIN_EMAIL, password: PB_ADMIN_PASSWORD }),
    });

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      throw new Error(`PocketBase admin auth failed: ${authResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    const createResponse = await fetch(`${PB_API_URL}/api/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        name,
        type: 'base',
        schema: [
          {
            name: 'title',
            type: 'text',
            required: false,
            options: {},
          }
        ]
      }),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      throw new Error(`Failed to create collection: ${createResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const newCollection = await createResponse.json();
    return NextResponse.json(newCollection, { status: 201 });
  } catch (error: any) {
    console.error('Error creating collection in PocketBase:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
