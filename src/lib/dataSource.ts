import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "@/module/user/infra/entities/user.entity";
import { PasswordResetToken } from "@/module/tokenResetPassword/infra/entities/PasswordResetToken";
import Recipes from "@/module/recipes/infra/entities/recipes.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db", // nome do serviço no docker
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "admin123",
  database: process.env.DB_NAME || "recipes_fullstack",
  synchronize: true, // ⚠️ use false em produção
  logging: true,
  entities: [User, PasswordResetToken, Recipes],
});
