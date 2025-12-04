export default interface IRecipesRegister {
  title?: string;

  ingredients?: string[];

  instructions?: string;

  userCreatorId?: string;

  imagem?: string;

  createdAt?: Date;

  updatedAt?: Date;
}