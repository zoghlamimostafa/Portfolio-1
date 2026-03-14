import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { systemPrompt } from "@/data/portfolio";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return a mock response when API key is not configured
      return new Response(
        JSON.stringify({
          error: "OpenAI API key not configured",
          message:
            "The AI chat feature requires an OpenAI API key. Please add OPENAI_API_KEY to your environment variables.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
