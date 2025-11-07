import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Role from "./role.enum";

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
}