// utils/deleteHandlers.ts
import { toast } from "sonner";

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return false;

    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    toast.success("Product deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Failed to delete product");
    return false;
  }
};

export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category? This will remove the category from all associated products."
    );
    if (!confirmed) return false;

    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete category");
    }

    toast.success("Category deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    toast.error("Failed to delete category");
    return false;
  }
};
