import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const readersTable = sqliteTable("readers", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  picture: text("picture").notNull(),
});

export const readersRelations = relations(readersTable,  ({ many }) => ({
  loans: many(loansTable)
}));

export const booksTable = sqliteTable("books", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  picture: text("picture").notNull(),
});

export const booksRelations = relations(booksTable, ({ many }) => ({
  loans: many(loansTable)
}));

export const loansTable = sqliteTable("loans", {
  id: integer("id").primaryKey(),
  readerId: integer("reader_id").notNull().references(() => readersTable.id),
  bookId: integer("book_id").notNull().references(() => booksTable.id),
  date: integer("date", { mode: "timestamp" }).notNull(),
  estimatedReturnDate: integer("return_date", { mode: "timestamp" }).notNull(),
  returnedDate: integer("returned_date", { mode: "timestamp" }),
  notified: integer("notified", { mode: "boolean" }).notNull().default(false),
});

export const loansRelations = relations(loansTable, ({ one }) => ({
  reader: one(readersTable, {
    fields: [loansTable.readerId],
    references: [readersTable.id]
  }),
  book: one(booksTable, {
    fields: [loansTable.bookId],
    references: [booksTable.id]
  })
}));
