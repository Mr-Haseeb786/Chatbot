"use client";

import { OpenAIStream, StreamingTextResponse } from "ai";
import { prompts } from "./prompts";
import { useDispatch, useSelector } from "react-redux";

const parseMessage = (messageArray, mood) => {
  const outboundMessages = messageArray.map((msg) => ({
    role: msg.isUserPrompt ? "user" : "system",
    content: msg.message,
  }));
  console.log(mood);

  // case statements to switch prompts to mood

  let systemPrompt;
  switch (mood) {
    case "Normal":
      systemPrompt = prompts[0];
      console.log("first");
      break;
    case "Descriptive":
      systemPrompt = prompts[1];
      break;
    case "Concise":
      systemPrompt = prompts[2];
      break;
    case "Angry":
      systemPrompt = prompts[3];
      break;
    default:
      systemPrompt = prompts[0];
      break;
  }

  outboundMessages.unshift({
    role: "system",
    content: systemPrompt,
  });

  console.log(outboundMessages);
  return outboundMessages;
};

export const streamApi = async (messageArray, mood, modelN, api, arrayId) => {
  let baseUrl = "https://zukijourney.xyzbot.net";
  let API_KEY = "zu-b64a0b56e65f232458224d40c30322d4";

  if (api == "convoai") {
    baseUrl = "https://api.convoai.tech";
    API_KEY = "sk-rHk5AcwxQ6OLMkoJVzXjZYDTjYZRZSxWtpu3BhFkxmog28HL";
  }

  const outboundMessages = parseMessage(messageArray, mood);
  console.log(outboundMessages.length);

  try {
    if (!arrayId) {
      throw new Error("No Message Chat array found");
    }

    const res = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: modelN,
        messages: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 500,
        stream: true,
        n: 1,
      }),
    });

    const stream = OpenAIStream(res, {
      onStart: async () => {
        // This callback is called when the stream starts
        // You can use this to save the prompt to your database
        // await (prompt);
        // console.log(messageArray)
      },
      onToken: async (token) => {},
      onCompletion: async (completion) => {
        // This callback is called when the stream completes
        // You can use this to save the final completion to your database
        // await saveCompletionToDatabase(completion);
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    return error;
  }
};
