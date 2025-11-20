/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } from '../../../../../lib/constants';

// Helper function to get PocketBase config
const getPBConfig = () => {
  // Use environment variables
  return {
    url: process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090',
    adminEmail: PB_ADMIN_EMAIL || process.env.PB_ADMIN_EMAIL || 'francisco@gmail.com',
    adminPassword: PB_ADMIN_PASSWORD || process.env.PB_ADMIN_PASSWORD || '1234512345'
  };
};

export async function GET(
  request: Request,
  { params }: { params: { collectionId: string } }
) {
  const { collectionId } = params;
  const { url: PB_API_URL, adminEmail: PB_ADMIN_EMAIL, adminPassword: PB_ADMIN_PASSWORD } = getPBConfig();

  try {
    const authResponse = await fetch(`${PB_API_URL}/api/admins/auth-with-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity: PB_ADMIN_EMAIL,
        password: PB_ADMIN_PASSWORD,
      }),
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      throw new Error(
        `PocketBase admin auth failed: ${authResponse.status} - ${errorText}`
      );
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    const recordsResponse = await fetch(
      `${PB_API_URL}/api/collections/${collectionId}/records`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (!recordsResponse.ok) {
      throw new Error(
        `PocketBase responded with status: ${recordsResponse.status}`
      );
    }

    const data = await recordsResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(
      `Error fetching records for collection ${collectionId} from PocketBase:`,
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { collectionId: string } }
) {
  const { collectionId } = params;
  const { url: PB_API_URL, adminEmail: PB_ADMIN_EMAIL, adminPassword: PB_ADMIN_PASSWORD } = getPBConfig();

  try {
    const contentType = request.headers.get('content-type') || '';
    let bodyForPocketbase: BodyInit;
    const headersForPocketbase = new Headers();

    if (contentType.includes('application/json')) {
      const body = await request.json();
      bodyForPocketbase = JSON.stringify(body);
      headersForPocketbase.append('Content-Type', 'application/json');
    } else {
      // Let fetch handle the multipart/form-data with boundary
      bodyForPocketbase = await request.formData();
    }

    const authResponse = await fetch(`${PB_API_URL}/api/admins/auth-with-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity: PB_ADMIN_EMAIL,
        password: PB_ADMIN_PASSWORD,
      }),
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      throw new Error(
        `PocketBase admin auth failed: ${authResponse.status} - ${errorText}`
      );
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    headersForPocketbase.append('Authorization', `Bearer ${adminToken}`);

    const createResponse = await fetch(
      `${PB_API_URL}/api/collections/${collectionId}/records`,
      {
        method: 'POST',
        headers: headersForPocketbase,
        body: bodyForPocketbase
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(
        `Failed to create record: ${createResponse.status} - ${errorText}`
      );
    }

    const newRecord = await createResponse.json();
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error: any) {
    console.error(
      `Error creating record for collection ${collectionId} in PocketBase:`,
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
