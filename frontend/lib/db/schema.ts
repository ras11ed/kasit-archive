
import {
  pgTable,
  uuid,
  varchar,
  text,
  bigint,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const documentStatusEnum = pgEnum("document_status", [
  "uploaded",
  "processing",
  "indexed",
  "failed",
]);

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),

  fileName: varchar("file_name", { length: 255 }).notNull(),

  fileType: varchar("file_type", { length: 100 }).notNull(),

  fileSize: bigint("file_size", { mode: "number" }).notNull(),

  storagePath: text("storage_path").notNull(),

  status: documentStatusEnum("status")
    .default("uploaded")
    .notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
