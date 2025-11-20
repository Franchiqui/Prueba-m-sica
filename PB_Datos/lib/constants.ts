export const NEXT_PUBLIC_POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
export const NEXT_PUBLIC_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'francisco@gmail.com';
export const NEXT_PUBLIC_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '1234512345';
// Backward-compatible aliases for existing imports across the codebase
export const PB_API_URL = NEXT_PUBLIC_POCKETBASE_URL;
export const PB_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'francisco@gmail.com';
export const PB_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '1234512345';

export const FIELD_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  BOOL: 'bool',
  EMAIL: 'email',
  URL: 'url',
  DATE: 'date',
  SELECT: 'select',
  JSON: 'json',
  FILE: 'file',
  RELATION: 'relation',
  USER: 'user'
} as const;

export type FieldType = typeof FIELD_TYPES[keyof typeof FIELD_TYPES];

export interface FieldDefinition {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  max?: number;
  min?: number;
  pattern?: string;
}

export interface Collection {
  id: string;
  name: string;
  type: 'base' | 'view';
  schema: FieldDefinition[];
  created: string;
  updated: string;
}

export const DEFAULT_FIELD_OPTIONS: Record<FieldType, Partial<FieldDefinition>> = {
  [FIELD_TYPES.TEXT]: { max: 255 },
  [FIELD_TYPES.NUMBER]: { min: 0, max: 999999999 },
  [FIELD_TYPES.BOOL]: {},
  [FIELD_TYPES.EMAIL]: {},
  [FIELD_TYPES.URL]: {},
  [FIELD_TYPES.DATE]: {},
  [FIELD_TYPES.SELECT]: { options: ['Option 1', 'Option 2'] },
  [FIELD_TYPES.JSON]: {},
  [FIELD_TYPES.FILE]: {},
  [FIELD_TYPES.RELATION]: {},
  [FIELD_TYPES.USER]: {}
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

export type Theme = typeof THEMES[keyof typeof THEMES];

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

export const GRADIENT_COLORS = {
  PRIMARY: 'from-blue-500 to-purple-600',
  SECONDARY: 'from-green-400 to-blue-500',
  ACCENT: 'from-pink-500 to-orange-400',
  DARK: 'from-gray-800 to-gray-900',
  LIGHT: 'from-gray-100 to-gray-200'
} as const;

export const API_ENDPOINTS = {
  COLLECTIONS: '/api/collections',
  RECORDS: (collection: string) => `/api/collections/${collection}/records`,
  FILES: (collection: string, recordId: string, filename: string) =>
    `/api/files/${collection}/${recordId}/${filename}`
} as const;

export const LOCAL_STORAGE_KEYS = {
  THEME: 'pb_datos_theme',
  RECENT_COLLECTIONS: 'pb_datos_recent_collections'
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Invalid email address',
  INVALID_URL: 'Invalid URL format',
  MIN_LENGTH: (min: number) => `Minimum length is ${min} characters`,
  MAX_LENGTH: (max: number) => `Maximum length is ${max} characters`,
  MIN_VALUE: (min: number) => `Minimum value is ${min}`,
  MAX_VALUE: (max: number) => `Maximum value is ${max}`
} as const;

export const SUCCESS_MESSAGES = {
  COLLECTION_CREATED: 'Collection created successfully',
  COLLECTION_UPDATED: 'Collection updated successfully',
  RECORD_CREATED: 'Record created successfully',
  RECORD_UPDATED: 'Record updated successfully',
  FIELD_ADDED: 'Field added successfully'
} as const;
