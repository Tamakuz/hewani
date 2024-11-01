import { pgTable, uuid, varchar, text, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  stock: integer('stock').notNull().default(0),
  image: varchar('image', { length: 255 }),
  imageKey: varchar('image_key', { length: 255 }), // for image deletion purposes
  weight: decimal('weight', { precision: 5, scale: 2 }), // in kg
  age: integer('age'), // in months
  breed: varchar('breed', { length: 100 }), // jenis/ras kambing
  gender: varchar('gender', { length: 10 }), // jantan/betina
  health_status: varchar('health_status', { length: 50 }), // status kesehatan
  vaccination_status: boolean('vaccination_status').default(false),
  categoryId: uuid('category_id').references(() => categories.id),
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});