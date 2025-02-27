import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updateAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserCourseAccessTable } from "./userCourseAccess";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UserTable = pgTable("users", {
  id,
  clerkUserId: text().notNull().unique(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }),
  createdAt,
  updateAt,
});

export const UserRelationships = relations(UserTable, ({ many }) => ({
  userCourseAccess: many(UserCourseAccessTable),
}));
