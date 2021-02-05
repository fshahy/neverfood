import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Food } from './food.entity';
import { Menu } from './menu.entity';

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Menu, menu => menu.items)
    menu: Menu;

    @ManyToOne(() => Food, food => food.items)
    food: Food;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    price: number;
}