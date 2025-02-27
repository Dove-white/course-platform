import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updateAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";
import { LessonTable } from "./lesson";

export const courseSectionStatuses = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatuses)[number];
export const courseSectionStatusesEnum = pgEnum(
  "course_section_status",
  courseSectionStatuses
);

export const CourseSectionTable = pgTable("course_section", {
  id,
  name: text().notNull(),
  status: courseSectionStatusesEnum().notNull().default("private"),
  courseId: uuid()
    .notNull()
    .references(() => CourseTable.id, { onDelete: "cascade" }),
  createdAt,
  updateAt,
});

export const CourseSectionRelationships = relations(
  CourseSectionTable,
  ({ many, one }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id],
    }),
    lessons: many(LessonTable),
  })
);
