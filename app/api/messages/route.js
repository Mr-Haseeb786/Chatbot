export const POST = async (req) => {
  const { messages } = await req.json();

  const outboundMessages = messages.map((msg) => {
    role: msg.isUserPrompt ? "user" : "system";
    content: msg.message;
  });

  outboundMessages.unshift({
    role: "system",
    content: "You are a helpful assistant",
  });
};
