import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSpeakingFeedback = async (
  targetSentence: string,
  userTranscript: string
): Promise<FeedbackResponse> => {
  try {
    const prompt = `
      You are an encouraging English teacher for 9th grade students.
      
      Target Sentence: "${targetSentence}"
      User Said (Transcribed): "${userTranscript}"

      Evaluate the user's speaking. 
      If the user transcript is very close to the target, give 'Excellent'.
      If it has minor errors but is understandable, give 'Good'.
      If it is completely wrong or unrelated, give 'Try Again'.

      Provide a short, encouraging feedback message (max 20 words).
      If there was a mistake, show the corrected pronunciation focus.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.STRING, enum: ["Excellent", "Good", "Try Again"] },
            feedback: { type: Type.STRING },
            correctedPronunciation: { type: Type.STRING },
          },
          required: ["score", "feedback"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as FeedbackResponse;
    }
    
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails or isn't configured
    return {
      score: "Good",
      feedback: "Good effort! I couldn't connect to the AI judge, but keep practicing.",
    };
  }
};

export const generateMoreExamples = async (word: string, topic: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Generate 2 simple, fun example sentences for the word "${word}" related to the topic "${topic}". Target audience: 9th grade students. JSON array of strings.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        });
        if (response.text) {
            return JSON.parse(response.text);
        }
        return [`This is an example for ${word}.`];
    } catch (e) {
        return [`Here is a practice sentence for ${word}.`];
    }
}
