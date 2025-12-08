import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Role from "./role.enum";
import Recipes from "@/module/recipes/infra/entities/recipes.entity";

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column()
  phone?: string;

  @Column({ type: "date", nullable: true })
  dateOfBirth?: Date;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role?: Role;

  @Column({ type: "timestamptz" })
  createdAt?: Date;

  @Column({ type: "timestamptz" })
  updatedAt?: Date;

  @OneToMany(() => require('@/module/recipes/infra/entities/recipes.entity').default, (recipe:Recipes) => recipe.userCreator)
  recipes!: Recipes[];
}