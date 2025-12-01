import { AppDataSource } from "@/lib/dataSource";
import { PasswordResetToken } from "../entities/PasswordResetToken";

export const passwordResetRepo = AppDataSource.getRepository(PasswordResetToken);