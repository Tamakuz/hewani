import { Context } from "hono";
import { db } from "../../db/connection";
import { products } from "../../db/schema";
import imagekit from "../../config/imgkit";

export const postProduct = async (c: Context) => {
  try {
    // 1. Get product data from request body
    const { 
      name,
      description,
      price,
      stock,
      categoryId,
      isAvailable,
      image  // base64 string
    } = await c.req.json();

    // 2. Validate required fields
    if (!name || !price || !image) {
      return c.json({
        success: false,
        message: "Product name, price and image are required",
      }, 400);
    }

    // 3. Upload image using ImageKit
    try {
      const uploadResponse = await imagekit.upload({
        file: image, // Upload base64 string directly
        fileName: `${name}-image.jpg`,
      });

      if (!uploadResponse?.url) {
        throw new Error("Upload failed");
      }

      // 4. Insert product into database
      const newProduct = await db.insert(products).values({
        name,
        description: description || null,
        price,
        stock: stock || 0,
        categoryId: categoryId || null,
        isAvailable: isAvailable ?? true,
        image: uploadResponse.url,
        imageKey: uploadResponse.fileId // Add imageKey for future deletion
      }).returning();

      // 5. Return success response
      return c.json({
        success: true,
        message: "Product created successfully",
        data: newProduct[0]
      }, 201);

    } catch (uploadError) {
      console.log(uploadError);
      
      return c.json({
        success: false,
        message: "Failed to upload image",
        error: uploadError instanceof Error ? uploadError.message : "Unknown upload error"
      }, 500);
    }

  } catch (error) {
    // 6. Handle any errors
    console.error("Error creating product:", error);
    return c.json({
      success: false,
      message: "Failed to create product",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
};
