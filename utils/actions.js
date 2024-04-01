"use server";

// zu-b56d44c2d9a4a66112832e0467e81b1b ----------- Zuki Journey @ https://zukijourney.xyzbot.net/v1
// sk-rHk5AcwxQ6OLMkoJVzXjZYDTjYZRZSxWtpu3BhFkxmog28HL -------- ConvoAI @ https://api.convoai.tech
// messages: [
//           {
//             role: "user",
//             content: messageObj.message,
//           },
//         ],

import axios from "axios";

const parseMessage = (messageArray) => {
  const outboundMessages = messageArray.map((msg) => ({
    role: msg.isUserPrompt ? "user" : "system",
    content: msg.message,
  }));

  outboundMessages.unshift({
    role: "system",
    content: "You are a helpful assitant. Do not use the <SYSTEM> tag.",
  });

  console.log(outboundMessages);
  return outboundMessages;
};
export const apiReq = async (messageArray, modelN) => {
  let baseUrl = "https://zukijourney.xyzbot.net";

  if (modelN == "convoai") {
    baseUrl = "https://api.convoai.tech";
  }

  console.log(modelN, "test");
  const outboundMessages = parseMessage(messageArray);
  try {
    const { data } = await axios.post(
      ` ${baseUrl}/v1/chat/completions`,
      {
        messages: outboundMessages,
        model: modelN,
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
          // Authorization: `Bearer zu-b56d44c2d9a4a66112832e0467e81b1b`,
        },
      }
    );

    // zukijourney.xyzbot.net (api-base)

    console.log("success");

    return data;
  } catch (error) {
    // throw new Error(error.response);
    switch (error.response.status) {
      case 401:
        throw new Error("Error: Invalid API key");
      case 402:
        throw new Error("Error: Payment Required");
      case 404:
        throw new Error("Error: Model not found");
      default:
        throw new Error(`An Unknown Error Occured: ${error.response.status}}`);
    }
  }
};
