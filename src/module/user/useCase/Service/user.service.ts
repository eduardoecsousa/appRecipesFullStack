import IRegisterUser from "../../dto/IRegisterUser";
import { userRepository } from "../../infra/repo/userRepository";
import validateUserCreate from "./Validation/validationsUser";

export default class UserService {
  async listUsers() {
    return userRepository.find();
  }

  async createUser(userData: Partial<IRegisterUser>) {
    const { error, value } = validateUserCreate.validate(userData);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }
    const user = userRepository.create(value);
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
}