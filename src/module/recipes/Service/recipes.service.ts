import IRecipesRegister from "../dto/IRecipesRegister";
import { recipesRepository } from "../infra/repo/recipes.repo";
import validateRecipesCreate from "./validation/validete";

export default class RecipesService {
  async listRecipes() {
    return await recipesRepository.find();
  }

  async createRecipe(data: Partial<IRecipesRegister>) {
    const validation = validateRecipesCreate.validate(data);
    if (validation.error) {
      throw new Error(validation.error.message);
    }
    const recipe = recipesRepository.create(data);
    return await recipesRepository.save(recipe);
  }

  async showRecipes(id: string) {
    const recipe = await recipesRepository.findOneBy({ id });
    if (!recipe) {
      throw new Error("Recipe not found");
    }
    return recipe;
  }

  async updateRecipes(id: string, data: Partial<IRecipesRegister>) {
    const recipe = await this.showRecipes(id);
    Object.assign(recipe, data);
    return await recipesRepository.save(recipe);
  }
  
  async deleteRecipes(id: string) {
    const recipe = await this.showRecipes(id);
    return await recipesRepository.remove(recipe);
  } 
}