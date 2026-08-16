import "dotenv/config";
import { ChatGoogle } from "@langchain/google";

const model = new ChatGoogle({
  model: "gemini-3.7-flash", 
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0,
});

export async function testAI() {
  try {
    const response = await model.invoke(
      "Hello"
    );

    console.log("AI Response:", response.content);
  } catch (error) {
    console.error("AI Error:", error);
  }
}