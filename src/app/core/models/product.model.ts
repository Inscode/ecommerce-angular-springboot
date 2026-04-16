export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  emoji: string;
  imageUrl: string | null;
  badge: string | null;
  categoryName: string;
  categorySlug: string;
  inStock: boolean;
}

export interface ProductRequest {
  name: string;
  description: string;
  retailPrice: number;
  wholesalePrice: number;
  stock: number;    
  emoji: string;
  categoryId: number;
  badge?: string;
  imageUrl?: string;
}