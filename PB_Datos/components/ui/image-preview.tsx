"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useEffect } from 'react';
import pb from '../../../lib/pocketbase';
import { Loader2Icon } from 'lucide-react';

interface ImagePreviewProps {
  collectionId: string;
  recordId: string;
  fileName: string;
  className?: string; // Added className prop
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ collectionId, recordId, fileName, className }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | null = null;

    const fetchImage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `${pb.baseUrl}/api/files/${collectionId}/${recordId}/${fileName}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': pb.authStore.token,
          },
        });

        if (!isMounted) return;

        if (response.ok) {
          const blob = await response.blob();
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
        } else {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Image fetch failed. Full error:", err);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [collectionId, recordId, fileName]);

  if (isLoading) {
    return (
      <div className={`w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md ${className || ''}`}>
        <Loader2Icon className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <p className="text-xs text-red-500">No se pudo cargar la imagen.</p>;
  }

  if (imageUrl) {
    return <img src={imageUrl} alt="Imagen actual" className={`w-20 h-20 object-cover rounded-md ${className || ''}`} />;
  }

  return null;
};

export default ImagePreview;
