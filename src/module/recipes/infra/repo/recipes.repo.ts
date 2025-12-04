import { AppDataSource } from "@/lib/dataSource";
import Recipes from "../entities/recipes.entity";

export const recipesRepository = AppDataSource.getRepository(Recipes);