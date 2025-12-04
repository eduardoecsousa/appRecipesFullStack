export type Ingredient = {
  quantity: string;
  typeMeasure: string;
  name: string;
};

export type RecipeForm = {
  recipeName: string;
  ingredients: Ingredient[];
  instructions: string;
  image: string;
};