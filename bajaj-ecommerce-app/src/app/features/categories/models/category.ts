export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentId: string | null;
  image?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}