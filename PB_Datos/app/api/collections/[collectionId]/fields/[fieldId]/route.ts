/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PB_API_URL, PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } from '../../../../../../lib/constants';

export async function DELETE(request: Request, { params }: { params: { collectionId: string, fieldId: string } }) {
  const { collectionId, fieldId } = params;

  try {
    // Authenticate with PocketBase to get an admin token
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

    // Get the current collection to get its schema
    const collectionResponse = await fetch(`${PB_API_URL}/api/collections/${collectionId}`, {
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });

    if (!collectionResponse.ok) {
      const errorText = await collectionResponse.text();
      throw new Error(`Failed to fetch collection: ${collectionResponse.status} - ${errorText}`);
    }

    const collection = await collectionResponse.json();
    const existingSchema = collection.schema || [];

    // Log for debugging
    console.log('Collection schema:', JSON.stringify(existingSchema, null, 2));
    console.log('Requested fieldId:', fieldId);

    // Check if the field exists (more robust comparison)
    const fieldExists = existingSchema.some((field: any) => {
      const match = field.id === fieldId;
      console.log(`Comparing field.id "${field.id}" with requested fieldId "${fieldId}": ${match}`);
      return match;
    });

    if (!fieldExists) {
      console.log('Field not found in collection schema');
      return NextResponse.json({ error: 'Field not found' }, { status: 404 });
    }

    // Filter out the field to be deleted
    const newSchema = existingSchema.filter((field: any) => field.id !== fieldId);

    // Update the collection with the new schema
    const updateResponse = await fetch(`${PB_API_URL}/api/collections/${collectionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ schema: newSchema }),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`Failed to update collection schema after field deletion: ${updateResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const updatedCollection = await updateResponse.json();
    return NextResponse.json(updatedCollection, { status: 200 });

  } catch (error: any) {
    console.error(`Error deleting field ${fieldId} from collection ${collectionId} in PocketBase:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
