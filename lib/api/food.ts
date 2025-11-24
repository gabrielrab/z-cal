import type {
  FoodIdentificationResponse,
  IdentifyFoodRequest,
  GenerateRecipeRequest,
  GenerateRecipeResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function identifyFood(
  request: IdentifyFoodRequest
): Promise<FoodIdentificationResponse> {
  const response = await fetch(`${API_URL}/api/identify-food`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to identify food: ${response.statusText}`);
  }

  return response.json();
}

export async function generateRecipe(
  request: GenerateRecipeRequest
): Promise<GenerateRecipeResponse> {
  const response = await fetch(`${API_URL}/api/generate-recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate recipe: ${response.statusText}`);
  }

  return response.json();
}

export function getBase64FromDataUrl(dataUrl: string): string {
  const base64WithPrefix = dataUrl.split(",")[1];
  return base64WithPrefix;
}
