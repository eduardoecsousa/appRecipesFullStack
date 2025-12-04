import User from "@/module/user/infra/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Recipes{
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  title?: string;

  ingredients?: string[];

  instructions?: string;

  @Column()
  url?: string;

  @ManyToOne(() => User, (user) => user.recipes)
  userCreator?: User;

  createdAt?: Date;

  updatedAt?: Date;
}