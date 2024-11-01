import { Context } from "hono";
import { db } from "../../db/connection";
import { categories } from "../../db/schema";

export const getCategories = async (c: Context) => {
  try {
    // 1. Query all categories from database
    const allCategories = await db.select().from(categories);

    // 2. Check if categories exist
    if (!allCategories || allCategories.length === 0) {
      return c.json({
        success: false,
        message: "No categories found",
        data: []
      }, 404);
    }

    // 3. Return success response with categories
    return c.json({
      success: true,
      message: "Categories retrieved successfully",
      data: allCategories,
      total: allCategories.length
    }, 200);

  } catch (error) {
    // 4. Handle any errors
    console.error("Error fetching categories:", error);
    return c.json({
      success: false, 
      message: "Failed to fetch categories",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
};
