import { Context } from "hono";
import { db } from "../../db/connection";
import { categories, products } from "../../db/schema";
import { eq } from "drizzle-orm";

export const deleteCategories = async (c: Context) => {
  try {
    // 1. Get category ID from params
    const id = c.req.param('id');

    // 2. Check if category exists and has associated products
    const categoryProducts = await db.select()
      .from(products)
      .where(eq(products.categoryId, id));

    // 3. If products exist, update their categoryId to null
    if (categoryProducts.length > 0) {
      await db.update(products)
        .set({ categoryId: null })
        .where(eq(products.categoryId, id));
    }

    // 4. Delete category from database
    const deletedCategory = await db.delete(categories)
      .where(eq(categories.id, id))
      .returning();

    // 5. Check if category was found and deleted
    if (!deletedCategory || deletedCategory.length === 0) {
      return c.json({
        success: false,
        message: "Category not found",
      }, 404);
    }

    // 6. Return success response
    return c.json({
      success: true,
      message: "Category deleted successfully. Associated products have been updated.",
      data: deletedCategory[0]
    }, 200);

  } catch (error) {
    // 7. Handle any errors
    console.error("Error deleting category:", error);
    return c.json({
      success: false,
      message: "Failed to delete category",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
};
