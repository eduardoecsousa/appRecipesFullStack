import { AppDataSource } from "@/lib/dataSource";
import UserService from "@/module/user/Service/user.service";
import { NextResponse } from "next/server";

import { NextRequest } from 'next/server';

type Params = {
  params: { id: string };
};

const service = new UserService();

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }): Promise<NextResponse<any>> {
  const params = await context.params;
  await initDB();
  const { id } = params;
  try {
    const user = await service.showUser(id);
    return NextResponse.json(user);
  } catch (error:any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  await initDB();
  const { id } = await context.params;
  const userData = await req.json();
  const updateData = userData;
  try {
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required for update" },
        { status: 400 }
      );
    }
    const updatedUser = await service.updateUser(id, {
      ...updateData,
      updatedAt: new Date(),
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  await initDB();
  const { id } = await context.params;
  try {
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required for deletion" },
        { status: 400 }
      );
    }
    await service.deleteUser(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 400 }
    );
  }


}