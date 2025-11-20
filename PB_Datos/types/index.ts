export interface Collection {
  id: string;
  name: string;
  type: 'base' | 'view';
  schema: Field[];
  created: string;
  updated: string;
}

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: FieldOptions;
}

export type FieldType = 
  | 'text'
  | 'number'
  | 'bool'
  | 'email'
  | 'url'
  | 'date'
  | 'select'
  | 'json'
  | 'file'
  | 'relation';

export interface FieldOptions {
  max?: number;
  min?: number;
  pattern?: string;
  values?: string[];
  collectionId?: string;
}

export interface CollectionRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  data: Record<string, unknown>;
  created: string;
  updated: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
}

export interface FormState {
  isLoading: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export interface AppState {
  collections: Collection[];
  currentCollection?: Collection;
  records: CollectionRecord[];
  theme: Theme;
}

export type ApiResponse<T = unknown> = 
  | { success: true; data: T }
  | { success: false; error: string };

export interface PaginationParams {
  page: number;
  perPage: number;
  sort?: string;
  filter?: string;
}
