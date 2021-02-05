import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Food } from './food.entity';
import { MenuItem } from './menuitem.entity';

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => MenuItem, item => item.menu)
    items: MenuItem[];
}