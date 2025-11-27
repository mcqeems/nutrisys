export interface NutritionData {
  food_name: string;
  description: string;
  origin: string;
  portion_size: {
    amount: number;
    unit: string;
  };
  nutritional_facts: {
    calories: number;
    macronutrients: {
      carbohydrates: number;
      protein: number;
      fat: number;
    };
    micronutrients: {
      fiber: number;
      sugar: number;
      sodium: number;
      cholesterol: number;
      vitamins: Record<string, number>;
      minerals: Record<string, number>;
    };
  };
  health_analysis: {
    summary: string;
    recommended_for: string;
    cautions: string;
  };
}

export interface FoodLog {
  id: number;
  user_id: string;
  log_date: string;
  input_type: string;
  image_url: string | null;
  description: NutritionData;
}
