"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */


import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { motion } from 'framer-motion';
import { Loader2Icon, XIcon } from 'lucide-react';
import pb from '../../../lib/pocketbase';

// Assuming these interfaces are globally available or imported from a shared types file
interface Collection {
  id: string;
  name: string;
  type: string;
  schema: FieldSchema[];
}

interface FieldSchema {
  id: string;
  name: string;
  type: string;
  required: boolean;
  options?: Record<string, unknown>;
}

interface RecordData {
  id?: string;
  [key: string]: unknown;
}

export default function DatabasePage() {
  const router = useRouter(); // Initialize router
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [records, setRecords] = useState<RecordData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]); // New state for selected records
  const [enlargedImageUrl, setEnlargedImageUrl] = useState<string | null>(null); // State for enlarged image

  const handleRecordSelect = (recordId: string) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(recordId)
        ? prevSelected.filter((id) => id !== recordId)
        : [...prevSelected, recordId]
    );
  };

  // Function to show enlarged image
  const showEnlargedImage = (url: string) => {
    console.log('Showing enlarged image:', url);
    setEnlargedImageUrl(url);
  };

  // Function to hide enlarged image
  const hideEnlargedImage = () => {
    console.log('Hiding enlarged image');
    setEnlargedImageUrl(null);
  };

    useEffect(() => {
    const pb_auth = document.cookie.includes('pb_auth');
    const pb_admin_auth = document.cookie.includes('pb_admin_auth');
    if (!pb_auth && !pb_admin_auth) {
      router.push('/auth/login');
    } else {
        fetchCollections();
    }
  }, [router]);

  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/collections');
      if (!response.ok) throw new Error('Failed to fetch collections');
      const data = await response.json();
      setCollections(Array.isArray(data.items) ? data.items : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCollections([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecords = async (collectionId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/collections/${collectionId}/records`);
      if (!response.ok) throw new Error('Failed to fetch records');
      const data = await response.json();
      setRecords(Array.isArray(data.items) ? data.items : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollectionSelect = (collection: Collection) => {
    setSelectedCollection(collection);
    fetchRecords(collection.id);
  };

  const handleLogout = useCallback(() => {
    pb.authStore.clear();
    document.cookie = 'pb_auth=; Path=/; Max-Age=0; SameSite=Lax; Secure';
    document.cookie = 'pb_user=; Path=/; Max-Age=0; SameSite=Lax; Secure';
    document.cookie = 'pb_auth_type=; Path=/; Max-Age=0; SameSite=Lax; Secure';
    document.cookie = 'pb_admin_auth=; Path=/; Max-Age=0; SameSite=Lax; Secure';
    window.location.href = '/auth/login';
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Loader2Icon className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchCollections}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Collections List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="max-w-none mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Colecciones</h2>
              <div className="space-y-2 p-0">
                {Array.isArray(collections) && collections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => handleCollectionSelect(collection)}
                      className={`w-full text-left px-3 py-3 rounded-md transition-all duration-300 relative overflow-hidden ${
                        selectedCollection?.id === collection.id
                          ? 'border-2 border-blue-800 text-blue-900 dark:text-blue-100 shadow-lg shadow-blue-800/50'
                          : 'border border-white dark:border-gray-200 text-gray-900 dark:text-white hover:border-gray-100 dark:hover:border-gray-300 hover:shadow-lg hover:shadow-gray-400/30'
                      }`}
                      style={{
                        background: selectedCollection?.id === collection.id
                          ? 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.01))'
                          : 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.005))'
                      }}
                    >
                      <div className={`absolute inset-0 rounded-md transition-opacity duration-300 ${
                        selectedCollection?.id === collection.id
                          ? 'bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 opacity-100'
                          : 'bg-gradient-to-r from-gray-400/10 via-transparent to-gray-400/10 opacity-0 hover:opacity-100'
                      }`} />
                      <span className="relative z-10">{collection.name}</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Records Display Area */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {selectedCollection ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Registros de {selectedCollection.name}
                </h2>

                {/* Desktop View: Table */}
                <div className="hidden md:block">
                  <div className="overflow-x-auto" style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d1d5db transparent'
                  }}>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="relative px-6 py-3"><span className="sr-only">Select</span></th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            ID
                          </th>
                          {selectedCollection.type === 'auth' && (
                            <>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                Username
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                Email
                              </th>
                            </>
                          )}
                          {selectedCollection.schema && selectedCollection.schema.map((field) => (
                            <th
                              key={field.id}
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                              {field.name}
                            </th>
                          ))}
                          {/* Display headers for any additional fields not in the schema */}
                          {selectedCollection && records && records.length > 0 && (
                            Object.keys(records[0])
                              .filter(key => {
                                // Skip system fields
                                if (['id', 'created', 'updated'].includes(key)) return false;
                                // Skip fields that are already displayed via schema
                                if (selectedCollection.schema && selectedCollection.schema.some(field => field.name === key)) return false;
                                // Skip auth-specific fields
                                if (selectedCollection.type === 'auth' && ['username', 'email'].includes(key)) return false;
                                return true;
                              })
                              .map(key => (
                                <th
                                  key={key}
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  {key}
                                </th>
                              ))
                          )}
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Created
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Updated
                          </th>
                          <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {records.map((record) => (
                          <tr
                            key={record.id}
                            className={record.id && selectedRecords.includes(record.id) ? 'bg-blue-50 dark:bg-blue-900' : ''}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                checked={!!(record.id && selectedRecords.includes(record.id))}
                                onChange={() => record.id && handleRecordSelect(record.id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {record.id}
                            </td>
                            {selectedCollection.type === 'auth' && (
                              <>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                  {String(record.username)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                  {String(record.email)}
                                </td>
                              </>
                            )}
                            {selectedCollection.schema && selectedCollection.schema.map((field) => (
                              <td key={field.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                {field.type === 'file' && record[field.name] ? (
                                  <div className="flex overflow-x-auto space-x-2 py-1 max-w-xs scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                    {Array.isArray(record[field.name]) ? (
                                      // Multiple files case
                                      (record[field.name] as string[]).map((fileName, index) => (
                                        <img
                                          key={index}
                                          src={pb.files.getURL(record, fileName, {
                                            collectionId: selectedCollection.id,
                                            recordId: record.id as string
                                          })}
                                          alt={`${field.name} ${index}`}
                                          className="h-10 w-10 object-cover rounded-md cursor-pointer flex-shrink-0"
                                          onClick={() => {
                                            const imageUrl = pb.files.getURL(record, fileName, {
                                              collectionId: selectedCollection.id,
                                              recordId: record.id as string
                                            });
                                            console.log('Clicked on table image:', imageUrl);
                                            showEnlargedImage(imageUrl);
                                          }}
                                        />
                                      ))
                                    ) : (
                                      // Single file case
                                      <img
                                        src={pb.files.getURL(record, record[field.name] as string, {
                                          collectionId: selectedCollection.id,
                                          recordId: record.id as string
                                        })}
                                        alt={field.name}
                                        className="h-10 w-10 object-cover rounded-md cursor-pointer"
                                        onClick={() => {
                                          const imageUrl = pb.files.getURL(record, record[field.name] as string, {
                                            collectionId: selectedCollection.id,
                                            recordId: record.id as string
                                          });
                                          console.log('Clicked on table image:', imageUrl);
                                          showEnlargedImage(imageUrl);
                                        }}
                                      />
                                    )}
                                  </div>
                                ) : (
                                  String(record[field.name])
                                )}
                              </td>
                            ))}
                            {/* Display any additional fields not in the schema */}
                            {Object.entries(record)
                              .filter(([key]) => {
                                // Skip system fields
                                if (['id', 'created', 'updated'].includes(key)) return false;
                                // Skip fields that are already displayed via schema
                                if (selectedCollection.schema && selectedCollection.schema.some(field => field.name === key)) return false;
                                return true;
                              })
                              .map(([key, value]) => (
                                <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                  {String(value)}
                                </td>
                              ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {new Date(String(record.created)).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {new Date(String(record.updated)).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => {
                                  router.push(`/edit?collectionId=${selectedCollection.id}&recordId=${record.id}`);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                              >
                                Editar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile View: Cards */}
                <div className="block md:hidden mt-4 space-y-4">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className={`p-4 rounded-lg shadow-md transition-colors duration-300 ${
                        record.id && selectedRecords.includes(record.id)
                          ? 'bg-blue-100 dark:bg-blue-800'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {/* Image at the top */}
                      {selectedCollection && selectedCollection.schema.some(field => field.type === 'file' && record[field.name]) && (
                        <div className="mb-4 mx-auto relative">
                          {selectedCollection.schema
                            .filter(field => field.type === 'file' && record[field.name])
                            .map(field => (
                              <div key={field.id} className="mb-2">
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                  {field.name}:
                                </p>
                                <div className="flex overflow-x-auto space-x-2 py-1 max-w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                  {Array.isArray(record[field.name]) ? (
                                    // Multiple files case
                                    (record[field.name] as string[]).map((fileName, index) => (
                                      <img
                                        key={index}
                                        src={pb.files.getURL(record, fileName, {
                                          collectionId: selectedCollection.id,
                                          recordId: record.id as string
                                        })}
                                        alt={`${field.name} ${index}`}
                                        className="h-16 w-16 object-cover rounded-md cursor-pointer flex-shrink-0"
                                        onClick={() => {
                                          const imageUrl = pb.files.getURL(record, fileName, {
                                            collectionId: selectedCollection.id,
                                            recordId: record.id as string
                                          });
                                          showEnlargedImage(imageUrl);
                                        }}
                                      />
                                    ))
                                  ) : (
                                    // Single file case
                                    <img
                                      src={pb.files.getURL(record, record[field.name] as string, {
                                        collectionId: selectedCollection.id,
                                        recordId: record.id as string
                                      })}
                                      alt={field.name}
                                      className="h-16 w-16 object-cover rounded-md cursor-pointer"
                                      onClick={() => {
                                        const imageUrl = pb.files.getURL(record, record[field.name] as string, {
                                          collectionId: selectedCollection.id,
                                          recordId: record.id as string
                                        });
                                        showEnlargedImage(imageUrl);
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-2"
                          checked={!!(record.id && selectedRecords.includes(record.id))}
                          onChange={() => record.id && handleRecordSelect(record.id)}
                        />
                        <p className="font-bold text-gray-900 dark:text-white truncate">ID: {record.id}</p>
                      </div>

                      {selectedCollection.type === 'auth' && (
                        <>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Username:</span> {String(record.username)}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Email:</span> {String(record.email)}
                          </p>
                        </>
                      )}

                      {selectedCollection.schema && selectedCollection.schema.map((field) => (
                        // Only render non-file fields here, as file fields are moved to the top
                        field.type !== 'file' && (
                          <div key={field.id} className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                            <span className="font-semibold">{field.name}:</span>{' '}
                            {String(record[field.name])}
                          </div>
                        )
                      ))}

                      {Object.entries(record)
                        .filter(([key]) => {
                          if (['id', 'created', 'updated'].includes(key)) return false;
                          if (selectedCollection.schema && selectedCollection.schema.some(field => field.name === key)) return false;
                          if (selectedCollection.type === 'auth' && ['username', 'email'].includes(key)) return false;
                          return true;
                        })
                        .map(([key, value]) => (
                          <p key={key} className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                            <span className="font-semibold">{key}:</span> {String(value)}
                          </p>
                        ))}

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Created: {new Date(String(record.created)).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2"> {/* Added mb-2 for spacing before button */}
                        Updated: {new Date(String(record.updated)).toLocaleString()}
                      </p>

                      {/* Edit button moved here, below the dates */}
                      <div className="flex justify-end"> {/* Use flex and justify-end to align to the right */}
                        <button
                          onClick={() => {
                            router.push(`/edit?collectionId=${selectedCollection.id}&recordId=${record.id}`);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Selecciona una colección para ver sus registros en formato de tabla.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Image Enlargement Modal */}
      {enlargedImageUrl && (
        <div
          onClick={(e) => {
            console.log('Modal background clicked, hiding modal');
            e.stopPropagation();
            hideEnlargedImage();
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div onClick={(e) => {
            console.log('Modal content clicked, stopping propagation');
            e.stopPropagation();
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Close button clicked, hiding modal');
                hideEnlargedImage();
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'white',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              <XIcon className="w-8 h-8 text-white" />
            </button>
            <img
              src={enlargedImageUrl}
              alt="Enlarged view"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
              onClick={(e) => {
                console.log('Enlarged image clicked');
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
