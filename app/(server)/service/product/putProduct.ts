import { Context } from "hono";
import { db } from "../../db/connection";
import { products } from "../../db/schema";
import { eq } from "drizzle-orm";
import imagekit from "../../config/imgkit";

export const putProduct = async (c: Context) => {
  try {
    // 1. Get product ID from params
    const id = c.req.param('id');

    if (!id) {
      return c.json({
        success: false,
        message: "Product ID is required"
      }, 400);
    }

    // 2. Get existing product
    const existingProduct = await db.select().from(products).where(eq(products.id, id));

    if (existingProduct.length === 0) {
      return c.json({
        success: false,
        message: "Product not found"
      }, 404);
    }

    // 3. Get update data from request
    const body = await c.req.json();
    
    // Prepare update data
    const updateData: any = {
      name: body.name || existingProduct[0].name,
      description: body.description || existingProduct[0].description,
      price: body.price || existingProduct[0].price,
      stock: body.stock || existingProduct[0].stock,
      weight: body.weight || existingProduct[0].weight,
      age: body.age || existingProduct[0].age,
      breed: body.breed || existingProduct[0].breed,
      gender: body.gender || existingProduct[0].gender,
      health_status: body.health_status || existingProduct[0].health_status,
      vaccination_status: typeof body.vaccination_status !== 'undefined' ? 
        body.vaccination_status : 
        existingProduct[0].vaccination_status,
      categoryId: body.categoryId || existingProduct[0].categoryId,
      isAvailable: typeof body.isAvailable !== 'undefined' ? 
        body.isAvailable : 
        existingProduct[0].isAvailable,
      updatedAt: new Date()
    };

    // 4. Handle image update if new image is provided
    if (body.image) { // image in base64 format
      // Delete old image if exists
      if (existingProduct[0].imageKey) {
        try {
          await imagekit.deleteFile(existingProduct[0].imageKey);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }

      // Upload new image
      const fileName = `product_${Date.now()}`;
      
      const uploadResponse = await imagekit.upload({
        file: body.image, // base64 string
        fileName: fileName,
      });

      updateData.image = uploadResponse.url;
      updateData.imageKey = uploadResponse.fileId;
    }

    // 5. Update product in database
    const updatedProduct = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();

    // 6. Return success response
    return c.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct[0]
    }, 200);

  } catch (error) {
    // 7. Handle any errors
    console.error("Error updating product:", error);
    return c.json({
      success: false,
      message: "Failed to update product",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
};

