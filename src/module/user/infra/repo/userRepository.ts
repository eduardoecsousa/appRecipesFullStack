import { AppDataSource } from "@/lib/dataSource";
import User from "../entities/user.entity";


export const userRepository = AppDataSource.getRepository(User);
