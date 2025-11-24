import { useMutation } from "@tanstack/react-query";
import { generateRecipe } from "@/lib/api/food";
import type { GenerateRecipeRequest } from "@/lib/api/types";

export function useRecipeChat() {
  return useMutation({
    mutationFn: (request: GenerateRecipeRequest) => generateRecipe(request),
  });
}
