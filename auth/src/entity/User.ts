import { IsNotEmpty, MinLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(8)
    @IsNotEmpty()
    password: string;
}