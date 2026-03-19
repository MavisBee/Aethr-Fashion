/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";
import { Product, QuizState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function curateCapsule(quizState: QuizState): Promise<Product[]> {
  const prompt = `
    You are a luxury fashion stylist for the brand AETHR. 
    Based on the user's style profile, select 4 to 6 products from the provided catalog that form a cohesive "Capsule Wardrobe".
    
    User Profile:
    - Visual Mood: ${quizState.moodSelection}
    - Color Palette: ${quizState.colorPalette}
    - Style Vibe: ${quizState.vibe}
    - Preferred Silhouette: ${quizState.silhouette}
    
    Catalog:
    ${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, name: p.name, vibe: p.vibe, tags: p.tags })))}
    
    Return ONLY a JSON array of product IDs. Example: ["1", "3", "5"]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const productIds: string[] = JSON.parse(response.text || "[]");
    return PRODUCTS.filter(p => productIds.includes(p.id));
  } catch (error) {
    console.error("AI Curation failed, falling back to heuristic matching:", error);
    // Fallback: Filter by vibe
    return PRODUCTS.filter(p => quizState.vibe && p.vibe.includes(quizState.vibe)).slice(0, 5);
  }
}
