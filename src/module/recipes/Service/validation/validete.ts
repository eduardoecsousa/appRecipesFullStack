import Joi from "joi";

export const validateRecipesCreate = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  ingredients: Joi.array().items(Joi.string()).min(1).required(),
  instructions: Joi.string().min(10).required(),
  userCreatorId: Joi.string().required(),
  imagem: Joi.string().uri().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export default validateRecipesCreate;