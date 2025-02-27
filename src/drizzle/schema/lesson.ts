import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updateAt } from "../schemaHelpers";
import { CourseSectionTable } from "./courseSection";
import { relations } from "drizzle-orm";
import { UserLessonCompleteTable } from "./userLessonComplete";

export const lessonStatuses = ["public", "private", "preview"] as const;
export type LessonStatus = (typeof lessonStatuses)[number];
export const lessonStatusesEnum = pgEnum("lesson_status", lessonStatuses);

export const LessonTable = pgTable("lesson", {
  id,
  name: text().notNull(),
  descriptions: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusesEnum().notNull().default("private"),
  sectionId: uuid()
    .notNull()
    .references(() => CourseSectionTable.id, { onDelete: "cascade" }),
  createdAt,
  updateAt,
});

export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
  courseSection: one(CourseSectionTable, {
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id],
  }),
  userLessonsComplete: many(UserLessonCompleteTable),
}));
