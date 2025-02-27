import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updateAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CourseProductTable } from "./courseProduct";

export const productStatuses = ["public", "private"] as const;
export type ProductStatus = (typeof productStatuses)[number];
export const productStatusesEnum = pgEnum("product_status", productStatuses);

export const ProductTable = pgTable("product", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusesEnum().notNull().default("private"),
  createdAt,
  updateAt,
});

export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProduct: many(CourseProductTable),
}));
