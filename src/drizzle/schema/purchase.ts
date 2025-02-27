import { relations } from "drizzle-orm";
import { createdAt, id, updateAt } from "../schemaHelpers";
import { ProductTable } from "./product";
import { UserTable } from "./user";
import {
  pgTable,
  integer,
  text,
  uuid,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const PurchaseTable = pgTable("purchase", {
  id,
  pricePaidInCents: integer().notNull(),
  productDetails: jsonb()
    .notNull()
    .$type<{ name: string; description: string; imageUrl: string }>(),
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "restrict" }),
  productId: uuid()
    .notNull()
    .references(() => ProductTable.id, { onDelete: "restrict" }),
  stripeSessionId: text().notNull().unique(),
  refundedAt: timestamp({ withTimezone: true }),
  createdAt,
  updateAt,
});

export const PurchaseRelationships = relations(PurchaseTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [PurchaseTable.userId],
    references: [UserTable.id],
  }),
  product: one(ProductTable, {
    fields: [PurchaseTable.productId],
    references: [ProductTable.id],
  }),
}));
