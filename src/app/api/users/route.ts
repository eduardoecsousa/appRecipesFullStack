import { AppDataSource } from "@/lib/dataSource";
import UserService from "@/module/user/useCase/Service/user.service";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

const service = new UserService();

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function GET() {
  await initDB();
  const users = await service.listUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  await initDB();
  const userData = await request.json();
  try {
    const newUser = await service.createUser({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 400 }
    );
  }
} 
