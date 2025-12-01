import User from "@/module/user/infra/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";

@Entity("password_reset_tokens")
export class PasswordResetToken {
    
    @PrimaryGeneratedColumn()
    id!: number;

    // O Token em si (deve ser único para busca rápida)
    @Column({ type: "varchar" })
    @Index({ unique: true })
    token!: string;

    // A data em que o token deve parar de funcionar
    @Column({ type: "timestamp with time zone" })
    expires_at!: Date;

    // Relacionamento com a entidade do usuário (FOREIGN KEY)
    @Column()
    userId!: string;

    // Opcional: Para evitar que o mesmo token seja usado mais de uma vez
    @Column({ default: false })
    used!: boolean;
}