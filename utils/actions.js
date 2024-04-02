"use client";

// zu-b56d44c2d9a4a66112832e0467e81b1b ----------- Zuki Journey @ https://zukijourney.xyzbot.net/v1
// sk-rHk5AcwxQ6OLMkoJVzXjZYDTjYZRZSxWtpu3BhFkxmog28HL -------- ConvoAI @ https://api.convoai.tech
// messages: [
//           {
//             role: "user",
//             content: messageObj.message,
//           },
//         ],

import axios from "axios";
import { prompts } from "./prompts";
import { createParser } from "eventsource-parser";

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

// API HANDLING
export const apiReq = async (messageArray, mood, modelN, api) => {
  let baseUrl = "https://zukijourney.xyzbot.net";
  let API_KEY = "zu-b56d44c2d9a4a66112832e0467e81b1b";
  let counter = 0;

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (api == "convoai") {
    baseUrl = "https://api.convoai.tech";
    API_KEY = "sk-rHk5AcwxQ6OLMkoJVzXjZYDTjYZRZSxWtpu3BhFkxmog28HL";
  }

  const outboundMessages = parseMessage(messageArray, mood);
  try {
    const { data } = await axios.post(
      ` ${baseUrl}/v1/chat/completions`,
      {
        messages: outboundMessages,
        model: `${modelN}`,
        max_tokens: 300,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        // stream: false,
        stream: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        // responseType: "stream",
      }
    );

    // code to handle streaming responses

    const stream = new ReadableStream({
      async start(controller) {
        function onParse(event) {
          if (event.type === "event") {
            const data = event.data;
            if (String(data).includes("[")) {
              controller.close();
              console.log("closed");
              return;
            }
            try {
              const json = JSON.parse(data);
              const text = json.choices[0].delta?.content || "";

              // if (counter < 2 && (text.match(/\n/) || []).length) {
              //   return;
              // }

              const queue = encoder.encode(text);
              controller.enqueue(queue);

              counter++;
            } catch (err) {
              controller.error(err);
            }
          } else {
            console.log("not reached");
          }
        }
        // const parser = new TransformStream({ transform: onParse });
        const parser = createParser(onParse);
        for await (const chunk of data) {
          // console.log(data);
          const buffer = new TextEncoder().encode(chunk);
          // let test = decoder.decode(buffer);
          parser.feed(decoder.decode(buffer));
        }
      },
    });

    console.log("success");

    // return data.choices[0].message.content;
    return stream;
  } catch (error) {
    console.log(error.response.data);
    switch (error.response.status) {
      case 401:
        throw new Error("Error: Invalid API key");
      case 402:
        throw new Error("Error: Payment Required");
      case 404:
        throw new Error("Error: Model not found");
      case 429:
        throw new Error("Error: Wait a bit senpai!");
      default:
        throw new Error(
          `An Unknown Error Occured: ${error.response.data.error.message}`
        );
    }
  }
};
