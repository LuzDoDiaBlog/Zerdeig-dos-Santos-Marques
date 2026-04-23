import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAi = () => {
  if (aiInstance) return aiInstance;
  
  // Try all possible ways to get the key in different environments
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                 (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || 
                 (typeof process !== 'undefined' && process.env?.VITE_GEMINI_API_KEY) ||
                 '';
                 
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not found. Some features will be limited.');
  }
                 
  aiInstance = new GoogleGenAI({ apiKey });
  return aiInstance;
};

const DEFAULT_MODEL = "gemini-2.0-flash-exp"; // Stable and highly available model

export async function getDailyLiturgy(date: string) {
  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
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
    return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
  } catch (error) {
    console.error('Error fetching daily liturgy:', error);
    // Fallback liturgia básica para não deixar o usuário sem nada
    return {
      title: "Tempo Comum",
      color: "Verde",
      colorHex: "#22c55e",
      saint: "Santos do Dia",
      firstReading: { reference: "Leitura do Dia", text: "A palavra do Senhor é luz para os nossos caminhos. Que possamos meditar em Seus ensinamentos e praticar a caridade em todos os momentos de nossa jornada." },
      psalm: { reference: "Sl 23", text: "O Senhor é o meu pastor, nada me faltará. Em verdes pastagens me faz repousar." },
      gospel: { reference: "Evangelho do Dia", text: "Jesus nos convida a amar o próximo como a nós mesmos, sendo sal da terra e luz do mundo em cada gesto de bondade." },
      reflection: "Neste dia, somos convidados a silenciar o coração e escutar a voz de Deus que nos chama à esperança e à renovação espiritual."
    };
  }
}

export async function generatePrayer(theme: string = 'paz e esperança') {
  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
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
