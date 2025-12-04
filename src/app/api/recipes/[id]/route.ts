import { AppDataSource } from "@/lib/dataSource";
import RecipesService from "@/module/recipes/Service/recipes.service";
import { NextRequest, NextResponse } from "next/server";

const recipeService = new RecipesService();

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await initDB();
  const { id } = await context.params;
  try {
    const recipe = await recipeService.showRecipes(id);
    return NextResponse.json({ recipe }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  await initDB();
  const { id } = await context.params;
  const recipeData = await req.json();
  try {
    const updatedRecipe = await recipeService.updateRecipes(id, {
      ...recipeData,
      updatedAt: new Date(),
    });
    return NextResponse.json({ recipe: updatedRecipe }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  await initDB();
  const { id } = await context.params;
  try {
    await recipeService.deleteRecipes(id);
    return NextResponse.json({ message: "Recipe deleted successfully." }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}