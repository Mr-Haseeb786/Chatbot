import { db } from "@/db";
import { messageArray } from "@/db/schema";
import { nanoid } from "@reduxjs/toolkit";

export const insertMessage = async () => {
  await db.insert(messageArray).values({
    id: nanoid(),
    title: "test",
  });
};

export const getMessages = async () => {
  return await db.select().from(messageArray).orderBy("createdAt");
};
