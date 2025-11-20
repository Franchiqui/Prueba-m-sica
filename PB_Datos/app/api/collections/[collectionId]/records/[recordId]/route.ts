/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PB_API_URL, PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } from '../../../../../../lib/constants';

export async function GET(
  request: Request,
  { params }: { params: { collectionId: string; recordId: string } }
) {
  const { collectionId, recordId } = params;

  try {
    const authResponse = await fetch(
      `${PB_API_URL}/api/admins/auth-with-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity: PB_ADMIN_EMAIL,
          password: PB_ADMIN_PASSWORD,
        }),
      }
    );

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      throw new Error(
        `PocketBase admin auth failed: ${authResponse.status} - ${JSON.stringify(errorData)}`
      );
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    const recordResponse = await fetch(
      `${PB_API_URL}/api/collections/${collectionId}/records/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (!recordResponse.ok) {
      throw new Error(
        `PocketBase responded with status: ${recordResponse.status}`
      );
    }

    const data = await recordResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(
      `Error fetching record ${recordId} for collection ${collectionId} from PocketBase:`,
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { collectionId: string; recordId: string } }
) {
  const { collectionId, recordId } = params;
  
  if (!recordId) {
    return NextResponse.json(
      { error: 'Record ID is required for PUT operation' },
      { status: 400 }
    );
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let requestBody: any; // This will hold either JSON or FormData

    if (contentType.includes('application/json')) {
      requestBody = await request.json();
    } else if (contentType.includes('multipart/form-data')) {
      requestBody = await request.formData(); // Keep it as FormData
    } else {
      return NextResponse.json(
        { error: 'Unsupported Content-Type' },
        { status: 415 }
      );
    }

    const authResponse = await fetch(
      `${PB_API_URL}/api/admins/auth-with-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity: PB_ADMIN_EMAIL,
          password: PB_ADMIN_PASSWORD,
        }),
      }
    );

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      throw new Error(
        `PocketBase admin auth failed: ${authResponse.status} - ${JSON.stringify(errorData)}`
      );
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    // Determine headers and body based on the original request's content type
    const pocketbaseHeaders: HeadersInit = {
      'Authorization': `Bearer ${adminToken}`,
    };
    let pocketbaseBody: BodyInit;

    if (contentType.includes('application/json')) {
      pocketbaseHeaders['Content-Type'] = 'application/json';
      pocketbaseBody = JSON.stringify(requestBody);
    } else if (contentType.includes('multipart/form-data')) {
      // When sending FormData, do NOT set 'Content-Type' header manually.
      // The browser/Node.js fetch API will set it automatically with the correct boundary.
      pocketbaseBody = requestBody; // Send the FormData directly
    } else {
      // This case should ideally be caught earlier, but as a fallback
      return NextResponse.json(
        { error: 'Unsupported Content-Type for PocketBase update' },
        { status: 415 }
      );
    }

    const updateResponse = await fetch(
      `${PB_API_URL}/api/collections/${collectionId}/records/${recordId}`,
      {
        method: 'PATCH', // Use PATCH for partial updates
        headers: pocketbaseHeaders,
        body: pocketbaseBody,
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw new Error(
        `Failed to update record: ${updateResponse.status} - ${errorText}`
      );
    }

    const updatedRecord = await updateResponse.json();
    return NextResponse.json(updatedRecord);
  } catch (error: any) {
    console.error(
      `Error updating record ${recordId} for collection ${collectionId} in PocketBase:`,
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { collectionId: string; recordId: string } }
) {
  const { collectionId, recordId } = params;

  // Logs para depuración
  console.log('Received DELETE request for collectionId:', collectionId);
  console.log('Received DELETE request for recordId:', recordId);

  try {
    const authResponse = await fetch(
      `${PB_API_URL}/api/admins/auth-with-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity: PB_ADMIN_EMAIL,
          password: PB_ADMIN_PASSWORD,
        }),
      }
    );

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      throw new Error(
        `PocketBase admin auth failed: ${authResponse.status} - ${JSON.stringify(errorData)}`
      );
    }

    const authData = await authResponse.json();
    const adminToken = authData.token;

    const deleteResponse = await fetch(
      `${PB_API_URL}/api/collections/${collectionId}/records/${recordId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    // Check if the response is OK
    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      console.error('Error data from PocketBase (if not OK):', errorText);
      throw new Error(
        `Failed to delete record: ${deleteResponse.status} - ${errorText}`
      );
    }

    return NextResponse.json(
      { message: 'Record deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      `Error deleting record ${recordId} for collection ${collectionId} in PocketBase:`,
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}