// types/product.ts
export interface Product {
  title: string;
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  weight: number;
  age: number;
  breed: string;
  gender: string;
  health_status: string;
  vaccination_status: boolean;
  categoryId: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ProductFormData {
  id: any;
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  age: number;
  breed: string;
  gender: string;
  health_status: string;
  vaccination_status: boolean;
  categoryId: string;
  isAvailable: boolean;
  image: string;
}

export const DEFAULT_PRODUCT_FORM_DATA: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  weight: 0,
  age: 0,
  breed: "",
  gender: "",
  health_status: "",
  vaccination_status: false,
  categoryId: "",
  isAvailable: true,
  image: "",
  id: undefined,
};

export interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export interface EditCategoryDialogProps {
  category: Category;
  onSave: () => void;
}
