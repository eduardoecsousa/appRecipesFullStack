import { AppDataSource } from "@/lib/dataSource";
import RecipesService from "@/module/recipes/Service/recipes.service";
import { NextResponse } from "next/server";

const recipeService = new RecipesService();

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function POST(request: Request) {
  await initDB();
  const recipeData = await request.json();
  try {
    const newRecipe = await recipeService.createRecipe({
      ...recipeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ recipe: newRecipe }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 400 });
  }
}

export async function GET() {
  await initDB();
  const recipes = await recipeService.listRecipes();
  return NextResponse.json({ recipes }, { status: 200 });
}
