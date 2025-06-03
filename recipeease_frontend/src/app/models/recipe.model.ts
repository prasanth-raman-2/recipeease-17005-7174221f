export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isFavorite: boolean;
}
