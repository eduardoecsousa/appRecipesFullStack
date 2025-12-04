import { hashPassword } from "@/utils/crypto";
import IRegisterUser from "../dto/IRegisterUser";
import validateUserCreate from "./Validation/validationsUser";
import { userRepository } from "../infra/repo/userRepository";

export default class UserService {
  async listUsers() {
    return userRepository.find();
  }

  async createUser(userData: Partial<IRegisterUser>) {
    const { error, value } = validateUserCreate.validate(userData);
    const hashedPassword = await hashPassword(value.password);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }
    const user = userRepository.create({ ...value, password: hashedPassword });
    return userRepository.save(user);
  }

  async showUser(id: string) {
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateUser(id: string, userData: Partial<IRegisterUser>) {
    const user = await this.showUser(id);
    Object.assign(user, userData);
    return userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.showUser(id);
    return userRepository.remove(user);
  }

  async findByEmail(email: string) {
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updatePassword(userId: string, newPassword: string) {
    const user = await this.showUser(userId);
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    return userRepository.save(user);
  } 
}