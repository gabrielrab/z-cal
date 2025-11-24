export interface FoodMacros {
  protein: string;
  carbs: string;
  fat: string;
}

export interface FoodIdentificationResponse {
  name: string;
  calories: number;
  macros: FoodMacros;
  healthScore: number;
  insights: string;
}

export interface IdentifyFoodRequest {
  image: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GenerateRecipeRequest {
  messages: ChatMessage[];
}

export interface GenerateRecipeResponse {
  response: string;
}
