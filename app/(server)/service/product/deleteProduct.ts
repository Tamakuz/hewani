import { Context } from "hono";
import { db } from "../../db/connection";
import { products } from "../../db/schema";
import { eq } from "drizzle-orm";
import imagekit from "../../config/imgkit";

export const deleteProduct = async (c: Context) => {
  try {
    // 1. Get product ID from params
    const id = c.req.param('id');

    if (!id) {
      return c.json({
        success: false,
        message: "Product ID is required"
      }, 400);
    }

    // 2. Get product details first to get the imageKey
    const product = await db.select().from(products).where(eq(products.id, id));

    if (product.length === 0) {
      return c.json({
        success: false,
        message: "Product not found"
      }, 404);
    }

    // 3. Delete image from ImageKit if exists
    if (product[0].imageKey) {
      try {
        await imagekit.deleteFile(product[0].imageKey);
      } catch (error) {
        console.error("Error deleting image from ImageKit:", error);
        // Continue with product deletion even if image deletion fails
      }
    }

    // 4. Delete product from database
    const deletedProduct = await db.delete(products)
      .where(eq(products.id, id))
      .returning();

    // 5. Return success response
    return c.json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct[0]
    }, 200);

  } catch (error) {
    // 6. Handle any errors
    console.error("Error deleting product:", error);
    return c.json({
      success: false,
      message: "Failed to delete product",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
};
