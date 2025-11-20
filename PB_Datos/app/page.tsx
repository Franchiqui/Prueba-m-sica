"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */


import { useState, useEffect, useCallback } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, Trash2Icon, SaveIcon, Loader2Icon, PencilIcon, XIcon } from 'lucide-react';
import pb from '../../lib/pocketbase';
import ImagePreview from '../components/ui/image-preview';

// Interfaces remain the same
interface Collection { id: string; name: string; type: string; schema: FieldSchema[]; }
interface FieldSchema { id: string; name: string; type: string; required: boolean; options?: Record<string, unknown>; }
interface RecordData { id?: string; [key: string]: unknown; }

const fieldTypes = [ 'text', 'number', 'email', 'url', 'date', 'select', 'bool', 'json', 'file', 'relation', 'user' ];
const fileSubTypes = ['generic', 'image', 'video', 'audio', 'document'];
const FILE_SUBTYPE_MIMES: { [key: string]: string[] } = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  video: ['video/mp4', 'video/webm', 'video/ogg'],
  audio: ['audio/mpeg', 'audio/ogg', 'audio/wav'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
};

const fieldSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  type: z.string().min(1, 'Tipo requerido'),
  required: z.boolean().default(false),
  multipleFiles: z.boolean().optional().default(false),
  options: z.record(z.unknown()).optional()
});
const recordSchema = z.record(z.unknown());

export default function PBCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [records, setRecords] = useState<RecordData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] = useState(false);
  const [enlargedImageUrl, setEnlargedImageUrl] = useState<string | null>(null);
  const [filePreviews, setFilePreviews] = useState<Record<string, string | string[] | null>>({});
  const [fileSubType, setFileSubType] = useState('generic');
  const [selectOptions, setSelectOptions] = useState('');
  const [relationCollectionId, setRelationCollectionId] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceRender(true);
    }, 100); // 100ms delay
    return () => clearTimeout(timer);
  }, []);

  const fieldForm = useForm({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: '',
      type: '',
      required: false,
      multipleFiles: false,
      options: {}
    }
  });
  const recordForm = useForm({ resolver: zodResolver(recordSchema) });

  const watchedFieldType = fieldForm.watch('type');

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

  useEffect(() => { fetchCollections(); }, []);

  const fetchCollections = async (retryAttempt = 0) => {
    const maxRetries = 5; // Max attempts
    const retryDelay = 2000; // 2 seconds delay
    let response;

    try {
      setIsLoading(true); // Set loading true at the start of each attempt
      response = await fetch('/api/collections');
      if (!response.ok) {
        throw new Error('Failed to fetch collections');
      }
      const data = await response.json();
      setCollections(Array.isArray(data.items) ? data.items : []);
      setError(null); // Clear any previous errors on success
      setIsLoading(false); // Set loading false on success
    } catch (err: unknown) {
      if (retryAttempt < maxRetries) {
        console.warn(`Failed to fetch collections (attempt ${retryAttempt + 1}/${maxRetries}). Retrying in ${retryDelay / 1000}s...`, err);
        setTimeout(() => fetchCollections(retryAttempt + 1), retryDelay);
        // Do NOT set isLoading to false here, as a retry is pending
      } else {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setCollections([]);
        console.error('Max retries reached for fetchCollections:', err);
        setIsLoading(false); // Set loading false when all retries are exhausted
      }
    }
  };
  const fetchRecords = async (collectionId: string) => { try { setIsLoading(true); const response = await fetch(`/api/collections/${collectionId}/records`); if (!response.ok) throw new Error('Failed to fetch records'); const data = await response.json(); setRecords(Array.isArray(data.items) ? data.items : []); } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Unknown error'); } finally { setIsLoading(false); } };
  const handleCollectionSelect = (collection: Collection) => { setSelectedCollection(collection); fetchRecords(collection.id); recordForm.reset(); };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName) return;
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCollectionName }),
      });
      if (!response.ok) {
        throw new Error('Failed to create collection');
      }
      setNewCollectionName('');
      setIsCreateCollectionModalOpen(false);
      fetchCollections();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleDeleteCollection = async (collectionId: string) => {
      try {
          const response = await fetch(`/api/collections/${collectionId}`, {
              method: 'DELETE',
          });

          if (!response.ok) {
              const errorText = await response.text();
              try {
                  const errorData = JSON.parse(errorText);
                  throw new Error(`Failed to delete collection: ${response.status} - ${errorData.error || errorData.message || errorText}`);
              } catch {
                  throw new Error(`Failed to delete collection: ${response.status} - ${errorText}`);
              }
          }

          // Refresh collections after deletion
          fetchCollections();
          setSelectedCollection(null); // Deselect the collection
          setRecords([]); // Clear records
          setError(null);
      } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          setError(`Failed to delete collection: ${errorMessage}`);
          console.error('Error deleting collection:', err);
      }
  };

  const handleAddField = async (formData: FieldValues) => {
    if (!selectedCollection) {
      setError('No collection selected');
      return;
    }

    // Create a copy of the form data to avoid mutating the original
    const data: FieldValues & { options?: Record<string, unknown> } = { ...formData };

    if (data.type === 'select') {
        data.options = {
            ...data.options,
            values: selectOptions.split(',').map(opt => opt.trim()).filter(opt => opt !== '')
        };
    } else if (data.type === 'relation') {
        data.options = {
            ...data.options,
            collectionId: relationCollectionId,
        };
    } else if (data.type === 'file') {
      data.options = {
        ...data.options,
        maxSelect: data.multipleFiles ? 10 : 1, // Allow up to 10 files if multiple is enabled
        maxSize: 5 * 1024 * 1024, // 5MB
      };

      // Add MIME type restrictions if a specific file subtype is selected
      if (fileSubType !== 'generic' && FILE_SUBTYPE_MIMES[fileSubType]) {
        data.options.mimeTypes = FILE_SUBTYPE_MIMES[fileSubType];
      }

      // Remove the multipleFiles flag as it's not a PocketBase field option
      delete data.multipleFiles;
    }

    try {
      const response = await fetch(
        `/api/collections/${selectedCollection.id}/fields`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to add field: ${response.statusText}`
        );
      }

      const updatedCollection: Collection = await response.json();

      // Update both the collections list and the selected collection
      setCollections((prev) =>
        prev.map((c) => (c.id === updatedCollection.id ? updatedCollection : c))
      );
      setSelectedCollection(updatedCollection);

      // Reset the form
      fieldForm.reset({
        name: '',
        type: '',
        required: false,
        options: {},
      });
      setFileSubType('generic');
      setSelectOptions('');
      setRelationCollectionId('');
      setError(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to add field: ${errorMessage}`);
      console.error('Error adding field:', err);
    }
  };

  const handleDeleteField = async (collectionId: string, fieldId: string) => {
    try {
        const response = await fetch(`/api/collections/${collectionId}/fields/${fieldId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            try {
                const errorData = JSON.parse(errorText);
                throw new Error(`Failed to delete field: ${response.status} - ${errorData.error || errorData.message || errorText}`);
            } catch {
                throw new Error(`Failed to delete field: ${response.status} - ${errorText}`);
            }
        }

        // Update the selected collection to reflect the deletion immediately
        if (selectedCollection && selectedCollection.id === collectionId) {
            // Remove the deleted field from the selected collection's schema
            const updatedCollection = {
                ...selectedCollection,
                schema: selectedCollection.schema.filter(field => field.id !== fieldId)
            };
            setSelectedCollection(updatedCollection);
        }

        // Also refresh the collections list
        fetchCollections();

        setError(null);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Failed to delete field: ${errorMessage}`);
        console.error('Error deleting field:', err);
    }
};

  const handleSaveRecord = async (data: RecordData) => {
    if (!selectedCollection) return;
    if (selectedCollection.name === 'users' && !data.id) {
      delete data.verified;
      delete data.emailVisibility;
    }
    try {
      const url = data.id ? `/api/collections/${selectedCollection.id}/records/${data.id}` : `/api/collections/${selectedCollection.id}/records`;
      const schema = selectedCollection.schema;
      const hasFileFieldInSchema = schema.some(field => field.type === 'file');
      const bodyContent = (() => {
        if (hasFileFieldInSchema) {
          const formData = new FormData();
          for (const key in data) {
            if (data[key] instanceof FileList) {
              if (data[key].length > 0) {
                for (let i = 0; i < data[key].length; i++) {
                  formData.append(key, data[key][i]);
                }
              }
            } else if (data[key] !== null && data[key] !== undefined) {
              formData.append(key, String(data[key]));
            }
          }
          return formData;
        } else {
          const jsonData = { ...data };
          schema.forEach(field => {
            if (field.type === 'json' && typeof jsonData[field.name] === 'string') {
              try {
                jsonData[field.name] = JSON.parse(jsonData[field.name] as string);
              } catch (e) {
                // ignore parse error, it will be caught by the server
              }
            }
          });
          return JSON.stringify(jsonData);
        }
      })();
      const headers: HeadersInit = hasFileFieldInSchema ? new Headers() : new Headers({ 'Content-Type': 'application/json' });
      const response = await fetch(url, { method: data.id ? 'PUT' : 'POST', headers: headers, body: bodyContent });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save record: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      await fetchRecords(selectedCollection.id);
      recordForm.reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleDeleteRecord = async (collectionId: string, recordId: string) => {
      try {
          const response = await fetch(`/api/collections/${collectionId}/records/${recordId}`, {
              method: 'DELETE',
          });

          if (!response.ok) {
              const errorText = await response.text();
              try {
                  const errorData = JSON.parse(errorText);
                  throw new Error(`Failed to delete record: ${response.status} - ${errorData.error || errorData.message || errorText}`);
              } catch {
                  throw new Error(`Failed to delete record: ${response.status} - ${errorText}`);
              }
          }

          // Refresh records after deletion
          fetchRecords(collectionId);
          setError(null);
      } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          setError(`Failed to delete record: ${errorMessage}`);
          console.error('Error deleting record:', err);
      }
  };

  const renderFieldInput = (field: FieldSchema): JSX.Element => { const commonProps = { ...recordForm.register(field.name), className: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent', required: field.required }; if (selectedCollection?.name === 'users' && (field.name === 'password' || field.name === 'passwordConfirm')) { return <input type="password" {...commonProps} />; } switch (field.type) { case 'text': case 'email': case 'url': return <input type={field.type} {...commonProps} />; case 'number': return <input type="number" {...commonProps} />; case 'date': return <input type="date" {...commonProps} />; case 'bool': return ( <input type="checkbox" {...recordForm.register(field.name)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" /> ); case 'select': return ( <select {...commonProps}> {Array.isArray(field.options?.values) && field.options?.values.map((value: unknown) => ( <option key={String(value)} value={String(value)}>{String(value)}</option> ))} </select> ); case 'json': return <textarea {...commonProps} rows={3} />; case 'file': {
  const currentRecordId = recordForm.watch('id');
  const fileName = recordForm.getValues(field.name);
  const newFilePreviewUrl = filePreviews[field.name];

  // For existing records, get all file names (could be array or string)
  const existingFileNames: string[] = [];
  if (currentRecordId && fileName) {
    if (Array.isArray(fileName)) {
      existingFileNames.push(...fileName);
    } else if (typeof fileName === 'string') {
      existingFileNames.push(fileName);
    }
  }

  return (
    <div>
      <input
        type="file"
        {...commonProps}
        multiple={field.options && typeof field.options === 'object' && 'maxSelect' in field.options ? (field.options.maxSelect as number) > 1 : false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          commonProps.onChange(e); // Call the original onChange from register
          const files = (e.target as HTMLInputElement).files;
          if (files && files.length > 0) {
            // Store all selected files for preview
            const fileUrls: string[] = [];
            for (let i = 0; i < files.length; i++) {
              fileUrls.push(URL.createObjectURL(files[i]));
            }
            setFilePreviews(prev => ({
              ...prev,
              [field.name]: fileUrls.length > 0 ? fileUrls[0] : null, // Keep first for backward compatibility
              [`${field.name}_multiple`]: fileUrls
            }));
          } else {
            setFilePreviews(prev => ({
              ...prev,
              [field.name]: null,
              [`${field.name}_multiple`]: []
            }));
          }
        }}
      />

      {/* Preview of newly selected files */}
      {filePreviews[`${field.name}_multiple`] &&
       Array.isArray(filePreviews[`${field.name}_multiple`]) &&
       (filePreviews[`${field.name}_multiple`] as string[]).length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Imágenes seleccionadas ({(filePreviews[`${field.name}_multiple`] as string[]).length}):</p>
          <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {(filePreviews[`${field.name}_multiple`] as string[]).map((url: string, index: number) => (
              <div key={index} className="flex-shrink-0 relative">
                <img src={url} alt={`Selected ${index}`} className="h-16 w-16 object-cover rounded-md" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview of existing files in a scrollable container */}
      {currentRecordId && existingFileNames.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Imágenes actuales:</p>
          <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {existingFileNames.map((name, index) => (
              <div key={index} className="flex-shrink-0 relative">
                <ImagePreview
                  collectionId={selectedCollection!.id}
                  recordId={currentRecordId}
                  fileName={name}
                  className="h-16 w-16 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 default: return <input type="text" {...commonProps} />; } };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Loader2Icon className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isLoading) { return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"> <Loader2Icon className="w-8 h-8 animate-spin text-blue-600" /> </div> ); }
  if (error) { return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"> <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"> <p className="text-red-600 dark:text-red-400">{error}</p>  </div> </div> ); }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Colecciones</h2>
              <button onClick={() => setIsCreateCollectionModalOpen(true)} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center text-sm"><PlusIcon className="w-4 h-4 mr-1" /> Crear</button>
            </div>
            <div className="space-y-2 max-h-96 overflow-hidden p-2">
              {Array.isArray(collections) && collections.map((collection) => (
                <motion.div key={collection.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <div
                    onClick={() => handleCollectionSelect(collection)}
                    className={`w-full text-left p-3 rounded-md transition-all duration-300 relative overflow-hidden cursor-pointer ${
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
                    <span className="relative z-10 flex justify-between items-center w-full">
                      {collection.name}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteCollection(collection.id); }}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedCollection && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Añadir Campo</h3>
                <form
                  onSubmit={fieldForm.handleSubmit(handleAddField)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nombre del Campo
                    </label>
                    <input
                      {...fieldForm.register('name')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Campo
                    </label>
                    <select
                      {...fieldForm.register('type')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar tipo</option>
                      {fieldTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {watchedFieldType === 'select' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Opciones (separadas por comas)
                      </label>
                      <input
                        value={selectOptions}
                        onChange={(e) => setSelectOptions(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                  {watchedFieldType === 'relation' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Colección Relacionada
                      </label>
                      <select
                        value={relationCollectionId}
                        onChange={(e) => setRelationCollectionId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleccionar colección</option>
                        {collections.map((collection) => (
                          <option key={collection.id} value={collection.id}>
                            {collection.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {watchedFieldType === 'file' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Subtipo de Archivo
                        </label>
                        <select
                          value={fileSubType}
                          onChange={(e) => setFileSubType(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {fileSubTypes.map((subType) => (
                            <option key={subType} value={subType}>
                              {subType}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          {...fieldForm.register('multipleFiles')}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Permitir múltiples archivos
                        </label>
                      </div>
                    </>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...fieldForm.register('required')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Campo requerido
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Añadir Campo
                  </button>
                </form>

              </div>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {selectedCollection ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white"> Registros de {selectedCollection.name} </h2>
                <form onSubmit={recordForm.handleSubmit(handleSaveRecord)} className="space-y-4">
                  {selectedCollection.schema.map((field: FieldSchema) => (
                    <div key={field.id}>
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {field.name} ({field.type})
                          {field.required && ' *'}
                          {field.type === 'file' && field.options && typeof field.options === 'object' && 'maxSelect' in field.options && (field.options.maxSelect as number) > 1 && (
                            <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">múltiple</span>
                          )}
                        </label>
                        {field.name !== 'id' && field.name !== 'created' && field.name !== 'updated' && (
                          <button type="button" onClick={() => handleDeleteField(selectedCollection!.id, field.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" title="Eliminar campo">
                            <Trash2Icon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {renderFieldInput(field)}
                    </div>
                  ))}
                  {selectedCollection.name === 'users' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Contraseña
                        </label>
                        <input type="password" {...recordForm.register('password')} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirmar Contraseña
                        </label>
                        <input type="password" {...recordForm.register('passwordConfirm')} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                    </>
                  )}
                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex items-center justify-center w-40 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                    >
                      <SaveIcon className="w-4 h-4 mr-2" />
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => recordForm.reset()}
                      className="flex items-center justify-center w-40 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
                    >
                      <XIcon className="w-4 h-4 mr-2" />
                      Cancelar
                    </button>
                  </div>
                </form>

                <div className="mt-4 space-y-2 max-h-96 overflow-y-auto pr-2" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#9ca3af transparent'
                }}>
                  {Array.isArray(records) && records.map((record) => (
                    <motion.div
                      key={record.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden p-4"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Left column - Images, Date, and Actions */}
                        <div className="flex flex-col items-center md:items-start w-24 flex-shrink-0">
                          {/* Images Container */}
                          {selectedCollection && (
                            (() => {
                              // Get all file fields that have values in this record
                              const fileFieldsWithValues = selectedCollection.schema.filter(
                                field => field.type === 'file' && record[field.name]
                              );

                              // Get all image URLs from all file fields
                              const imageUrls: string[] = [];
                              fileFieldsWithValues.forEach(field => {
                                const fieldValue = record[field.name];
                                if (Array.isArray(fieldValue)) {
                                  fieldValue.forEach(fileName => {
                                    if (typeof fileName === 'string') {
                                      const url = pb.files.getUrl(record, fileName, {
                                        collectionId: selectedCollection.id,
                                        recordId: record.id as string
                                      });
                                      imageUrls.push(url);
                                    }
                                  });
                                } else if (typeof fieldValue === 'string') {
                                  const url = pb.files.getUrl(record, fieldValue, {
                                    collectionId: selectedCollection.id,
                                    recordId: record.id as string
                                  });
                                  imageUrls.push(url);
                                }
                              });

                              return imageUrls.length > 0 ? (
                                <div className="w-20 h-20 mb-2">
                                  <div className="flex overflow-x-auto space-x-1 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent rounded border border-gray-200 dark:border-gray-600 p-1">
                                    {imageUrls.map((url, index) => (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        key={index}
                                        src={url}
                                        alt={`record-image-${index}`}
                                        className="w-16 h-16 object-cover cursor-pointer flex-shrink-0 rounded hover:opacity-80 transition-opacity"
                                        onClick={() => showEnlargedImage(url)}
                                      />
                                    ))}
                                  </div>
                                </div>
                              ) : null;
                            })()
                          )}

                          {/* Date */}
                          <div className="text-xs text-gray-500 dark:text-gray-400 text-center w-full mt-2">
                            {typeof record.created === 'string' ? new Date(record.created).toLocaleString() : 'N/A'}
                          </div>

                          {/* Actions */}
                          <div className="flex justify-center space-x-2 mt-2 w-full">
                            <button
                              onClick={() => {
                                recordForm.reset(record); // Populate the form with the record data
                                // Also clear any file previews when loading an existing record
                                setFilePreviews({});
                              }}
                              className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50"
                              title="Editar"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => selectedCollection && handleDeleteRecord(selectedCollection.id, record.id as string)}
                              className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-800/50"
                              title="Eliminar"
                            >
                              <Trash2Icon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Record Details */}
                        <div className="flex-grow">
                          <div className="mb-3">
                            <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">ID: {record.id}</p>
                            <div className="grid grid-cols-1 gap-2">
                              {selectedCollection && (
                                selectedCollection.schema
                                      .filter(field => !['id', 'created', 'updated'].includes(field.name) && field.type !== 'file')
                                      .map((field) => {
                                        const value = record[field.name];
                                        let displayValue = String(value || 'N/A');
                                        if (typeof value === 'string' && value.length > 30) {
                                          displayValue = value.substring(0, 27) + '...';
                                        }

                                        return (
                                          <p key={field.id} className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                            <strong className="text-blue-500">{field.name}:</strong> {displayValue}
                                          </p>
                                        );
                                      })
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Selecciona una colección para ver y editar registros
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isCreateCollectionModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Crear Nueva Colección</h2>
              <form onSubmit={handleCreateCollection}>
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Nombre de la colección"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <button type="button" onClick={() => setIsCreateCollectionModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Crear</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Enlargement Modal */}
      {enlargedImageUrl && (
        <div
          onClick={(e) => {
            console.log('Modal background clicked, hiding modal');
            e.stopPropagation();
            hideEnlargedImage();
          }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
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
            className="max-w-full max-h-full object-contain"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh'
            }}
            onClick={(e) => {
              console.log('Enlarged image clicked');
              e.stopPropagation();
            }}
          />
        </div>
      )}

    </div>
  );
}
