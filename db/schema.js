import { relations } from "drizzle-orm";
import { boolean, text, varchar } from "drizzle-orm/mysql-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const messageObj = sqliteTable("Message", {
  id: text("id").primaryKey(),
  message: text("message"),
  isUserPrompt: boolean("isUserPrompt"),
  mood: text("mood"),
  messageArrayId: text("messageArrayId")
    .notNull()
    .references(() => messageArray.id),
});

export const messageArray = sqliteTable("MessageArray", {
  id: text("id").primaryKey(),
  title: text("title"),
});

export const arrayRelations = relations(messageArray, ({ many }) => ({
  messageObjects: many(messageObj, {
    fields: [messageObj.messageArrayId],
    references: [messageArray.id],
  }),
}));

// export const messageObjRelations = relations(messageObj, ({ one }) => ({
//   messageArrayCont: one(messageArray, {
//     fields: [messageObj.messageArrayId],
//   }),
// }));
