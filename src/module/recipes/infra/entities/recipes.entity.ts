import User from "@/module/user/infra/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Recipes {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  title?: string;

  ingredients?: string[];

  instructions?: string;

  @Column()
  url?: string;

  @ManyToOne(
    // Importa a classe User APENAS no contexto do decorador.
    () => require('@/module/user/infra/entities/user.entity').default, 
    (user:User) => user.recipes
  )
  userCreator!: User;

  createdAt?: Date;

  updatedAt?: Date;
}