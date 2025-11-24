import { useMutation } from "@tanstack/react-query";
import { identifyFood } from "@/lib/api/food";
import type { IdentifyFoodRequest } from "@/lib/api/types";

export function useFoodIdentification() {
  return useMutation({
    mutationFn: (request: IdentifyFoodRequest) => identifyFood(request),
  });
}
