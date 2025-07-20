export type TemplateMeta = {
  id: string;
  name: string;
  description?: string;
};

export type PageSettings = {
  backgroundColor: string;
  width: number;
};

export type ElementSettings = {
  color?: string;
  fontSize?: number;
  fontWeight?: 'light' | 'regular' | 'bold';
  content?: string;
  imageUrl?: string;
  imageFile?: File;
}; 