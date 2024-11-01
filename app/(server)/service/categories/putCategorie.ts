import { Context } from "hono";
import { db } from "../../db/connection";
import { categories } from "../../db/schema";
import { eq } from "drizzle-orm";

export const putCategorie = async (c: Context) => {
  try {
    // 1. Get category ID from params and data from request body
    const id = c.req.param('id');
    const { name, description, isActive } = await c.req.json();
    
    // 2. Validate required fields
    if (!name) {
      return c.json({
        success: false,
        message: "Category name is required",
      }, 400);
    }

    // 3. Update category in database
    const updatedCategory = await db.update(categories)
      .set({
        name,
        description,
        isActive: isActive ?? true
      })
      .where(eq(categories.id, id))
      .returning();

    // 4. Check if category was found and updated
    if (!updatedCategory || updatedCategory.length === 0) {
      return c.json({
        success: false,
        message: "Category not found",
      }, 404);
    }

    // 5. Return success response
    return c.json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory[0]
    }, 200);

  } catch (error) {
    // 6. Handle any errors
    console.error("Error updating category:", error);
    return c.json({
      success: false,
      message: "Failed to update category",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
};
