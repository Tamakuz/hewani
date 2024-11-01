import { Context } from "hono";
import { db } from "../../db/connection";
import { products } from "../../db/schema";

export const getAllProduct = async (c: Context) => {
  try {
    // 1. Query all products from database
    const allProducts = await db.select().from(products);

    // 2. Check if products exist
    if (!allProducts || allProducts.length === 0) {
      return c.json({
        success: false,
        message: "No products found",
        data: []
      }, 404);
    }

    // 3. Return success response with products
    return c.json({
      success: true,
      message: "Products retrieved successfully", 
      data: allProducts,
      total: allProducts.length
    }, 200);

  } catch (error) {
    // 4. Handle any errors
    console.error("Error fetching products:", error);
    return c.json({
      success: false,
      message: "Failed to fetch products",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
};
