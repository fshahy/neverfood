import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { City } from './city.entity';
import { Menu } from './menu.entity';


@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @ManyToOne(() => City, city => city.restaurants)
    city: City;

    @OneToOne(() => Menu)
    @JoinColumn()
    menu: Menu;
}