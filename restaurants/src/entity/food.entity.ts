import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuItem } from './menuitem.entity';

@Entity()
export class Food {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @OneToMany(() => MenuItem, item => item.food)
    items: MenuItem[];
}