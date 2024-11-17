import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getAllProduct } from "../../service/product/getAllProduct";
import { postCategorie } from "../../service/categories/postCategorie";
import { getCategories } from "../../service/categories/getCategories";
import { putCategorie } from "../../service/categories/putCategorie";
import { deleteCategories } from "../../service/categories/deleteCategories";
import { postProduct } from "../../service/product/postProduct";
import { deleteProduct } from "../../service/product/deleteProduct";
import { putProduct } from "../../service/product/putProduct";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.get("/products", getAllProduct);
app.post("/products", postProduct);
app.delete("/products/:id", deleteProduct);
app.put("/products/:id", putProduct);

app.get("/categories", getCategories);
app.post("/categories", postCategorie);
app.put("/categories/:id", putCategorie);
app.delete("/categories/:id", deleteCategories);
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
