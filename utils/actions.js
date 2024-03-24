"use server";

import axios from "axios";

export const apiReq = async (messageObj) => {
  try {
    const { data } = await axios.post(
      "https://zukijourney.xyzbot.net/v1/chat/completions",
      {
        messages: [
          {
            role: "user",
            content: messageObj.message,
          },
        ],
        model: "gpt-4",
        max_tokens: 300,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer zu-b56d44c2d9a4a66112832e0467e81b1b`,
        },
      }
    );

    // zukijourney.xyzbot.net (api-base)

    console.log("success");

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
