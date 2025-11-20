/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PB_API_URL, PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } from '../../../../lib/constants';

export async function GET(
  request: Request,
  { params }: { params: { collectionId: string } }
) {
  const { collectionId } = params;

  try {
    // Authenticate with PocketBase to get an admin token
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
      const errorData = await authResponse.json();
      throw new Error(`PocketBase admin auth failed: ${authResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    // Fetch collection details from PocketBase
    const collectionResponse = await fetch(`${PB_API_URL}/api/collections/${collectionId}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });

    if (!collectionResponse.ok) {
      const errorData = await collectionResponse.json();
      throw new Error(`Failed to fetch collection: ${collectionResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const collectionData = await collectionResponse.json();
    return NextResponse.json(collectionData);
  } catch (error: any) {
    console.error(`Error fetching collection ${collectionId} from PocketBase:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { collectionId: string } }) {
  const { collectionId } = params;

  try {
    // Authenticate with PocketBase to get an admin token
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
      const errorData = await authResponse.json();
      throw new Error(`PocketBase admin auth failed: ${authResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    // First, try to delete all records in the collection to avoid foreign key constraints
    try {
      const recordsResponse = await fetch(`${PB_API_URL}/api/collections/${collectionId}/records`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      if (recordsResponse.ok) {
        const recordsData = await recordsResponse.json();
        const records = Array.isArray(recordsData.items) ? recordsData.items : [];

        // Delete all records first
        for (const record of records) {
          try {
            await fetch(`${PB_API_URL}/api/collections/${collectionId}/records/${record.id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${adminToken}`,
              },
            });
          } catch (recordError) {
            console.warn(`Failed to delete record ${record.id}:`, recordError);
          }
        }
      }
    } catch (recordsError) {
      console.warn('Failed to fetch/delete records before collection deletion:', recordsError);
    }

    // Delete collection in PocketBase
    const deleteResponse = await fetch(`${PB_API_URL}/api/collections/${collectionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      throw new Error(`Failed to delete collection: ${deleteResponse.status} - ${JSON.stringify(errorData)}`);
    }

    return NextResponse.json({ message: 'Collection deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error(`Error deleting collection ${collectionId} in PocketBase:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
