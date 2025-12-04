import Role from "@/module/user/infra/entities/role.enum";
import { create } from "domain";
import Joi from "joi";

export const validateUserCreate = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(10).max(15).optional(),
  dateOfBirth: Joi.date().optional(),
  role: Joi.string().valid(...Object.values(Role)).optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export default validateUserCreate;