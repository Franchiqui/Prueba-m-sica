/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PB_API_URL, PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } from '../../../../../lib/constants';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request, { params }: { params: { collectionId: string } }) {
  const { collectionId } = params;
  const fieldData = await request.json();

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

    // First, get the current collection to get its schema
    const collectionResponse = await fetch(`${PB_API_URL}/api/collections/${collectionId}`, {
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });

    if (!collectionResponse.ok) {
      throw new Error(`Failed to fetch collection: ${collectionResponse.status}`);
    }

    const collection = await collectionResponse.json();
    const existingSchema = collection.schema || [];

    // Generate a proper field ID and structure
    const newField = {
      ...fieldData,
      id: fieldData.id || uuidv4().replace(/-/g, '').substring(0, 16),
      system: false,
      unique: false,
      options: {} // Start with empty options
    };

    // Handle specific field types and their options
    if (newField.type === 'file') {
      newField.options = {
        maxSelect: fieldData.multipleFiles ? 10 : 1, // Use fieldData.multipleFiles directly
        maxSize: fieldData.options?.maxSize || 5242880, // Use fieldData.options.maxSize or default
        ...fieldData.options // Include any other options from fieldData
      };
    } else if (newField.type === 'select') {
      newField.options = {
        values: Array.isArray(fieldData.options?.values) ? fieldData.options.values : [], // Ensure values is an array
        maxSelect: typeof fieldData.options?.maxSelect === 'number' ? fieldData.options.maxSelect : 1, // Default to 1
        ...fieldData.options // Include any other options from fieldData
      };
    } else if (newField.type === 'relation') {
      const relationCollectionId = fieldData.options?.collectionId;
      if (!relationCollectionId) {
        throw new Error('Relation field requires a target collection ID (options.collectionId).');
      }
      newField.options = {
        collectionId: relationCollectionId,
        cascadeDelete: typeof fieldData.options?.cascadeDelete === 'boolean' ? fieldData.options.cascadeDelete : false,
        maxSelect: typeof fieldData.options?.maxSelect === 'number' ? fieldData.options.maxSelect : 1,
      };
    }
    // For 'json' and other types, options remain empty as initialized

    // Add the new field to the schema
    const newSchema = [...existingSchema, newField];

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
      throw new Error(`Failed to update collection schema: ${updateResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const updatedCollection = await updateResponse.json();
    return NextResponse.json(updatedCollection, { status: 200 });

  } catch (error: any) {
    console.error(`Error adding field to collection ${collectionId} in PocketBase:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

    // Check if the field exists
    const fieldExists = existingSchema.some((field: any) => field.id === fieldId);
    if (!fieldExists) {
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
