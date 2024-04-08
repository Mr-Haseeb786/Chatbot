"use server";

import { db } from "@/db";
import { messageArray } from "@/db/schema";
import { nanoid } from "@reduxjs/toolkit";

export const createMessageArray = async () => {
  const id = nanoid();

  await db.insert(messageArray).values({
    id: id,
    title: "test",
  });

  return {
    id,
  };
};

export const getMessages = async () => {
  return await db.select().from(messageArray).orderBy("createdAt");
};
