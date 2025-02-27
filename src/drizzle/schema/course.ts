import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updateAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CourseProductTable } from "./courseProduct";

export const CourseTable = pgTable("course", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt,
  updateAt,
});

export const courseRelationships = relations(CourseTable, ({ many }) => ({
  courseProduct: many(CourseProductTable),
}));
