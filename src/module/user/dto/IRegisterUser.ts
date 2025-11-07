import Role from "../infra/entities/role.enum";

export default interface IRegisterUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  dateOfBirth?: Date;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
