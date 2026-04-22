import { GoogleGenAI, Type } from "@google/genai";

const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export async function getDailyLiturgy(date: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `For the date ${date}, provide the Catholic Daily Liturgy information in Portuguese. 
      Ensure the information is accurate according to the Roman Catholic Liturgical Calendar.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            color: { type: Type.STRING },
            colorHex: { type: Type.STRING },
            saint: { type: Type.STRING },
            firstReading: {
              type: Type.OBJECT,
              properties: {
                reference: { type: Type.STRING },
                text: { type: Type.STRING }
              },
              required: ["reference", "text"]
            },
            psalm: {
              type: Type.OBJECT,
              properties: {
                reference: { type: Type.STRING },
                text: { type: Type.STRING }
              },
              required: ["reference", "text"]
            },
            gospel: {
              type: Type.OBJECT,
              properties: {
                reference: { type: Type.STRING },
                text: { type: Type.STRING }
              },
              required: ["reference", "text"]
            },
            reflection: { type: Type.STRING }
          },
          required: ["title", "color", "colorHex", "saint", "firstReading", "psalm", "gospel", "reflection"]
        }
      }
    });
    
    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching daily liturgy:', error);
    return null;
  }
}

export async function generatePrayer(theme: string = 'paz e esperança') {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Escreva uma oração curta, inspiradora e poética (máximo 300 caracteres) com o tema específico: "${theme}". 
      Além da oração, forneça uma pequena reflexão (máximo 200 caracteres) que aprofunde o significado do tema escolhido.
      A oração e a reflexão devem ser acolhedoras, universais e trazer conforto espiritual.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prayerText: { type: Type.STRING },
            reflectionText: { type: Type.STRING }
          },
          required: ["prayerText", "reflectionText"]
        }
      }
    });
    
    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating prayer:', error);
    return {
      prayerText: 'Que a paz esteja com você neste dia.',
      reflectionText: 'A paz é o alicerce de uma vida plena e serena.'
    };
  }
}
