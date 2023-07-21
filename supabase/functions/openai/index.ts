import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { query } = await req.json();

  const completionConfig = {
    prompt: query,
  };

  return fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completionConfig),
  });
});
