// hooks/useProducts.ts
import { useState, useEffect } from "react";
import { Product } from "@/lib";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Product[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null); // Reset error state

      const response = await fetch("/api/products");
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      // Jika success true, set products meskipun array kosong
      if (data.success) {
        setProducts(data.data);
        setError(null);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
  };
};
