import { Context } from "hono";
import { db } from "../../db/connection";
import { categories } from "../../db/schema";

export const postCategorie = async (c: Context) => {
  try {
    // 1. Get category data from request body
    const body = await c.req.json();
    
    // 2. Validate required fields
    if (!body.name) {
      return c.json({
        success: false,
        message: "Category name is required",
      }, 400);
    }

    // 3. Insert category into database
    const newCategory = await db.insert(categories).values({
      name: body.name,
      description: body.description || null,
    }).returning();

    // 4. Return success response
    return c.json({
      success: true,
      message: "Category created successfully",
      data: newCategory[0]
    }, 201);

  } catch (error) {
    // 5. Handle any errors
    console.error("Error creating category:", error);
    return c.json({
      success: false,
      message: "Failed to create category",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
};
