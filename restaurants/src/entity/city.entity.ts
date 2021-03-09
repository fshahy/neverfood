import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Restaurant } from './restaurant.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Restaurant, restaurant => restaurant.city)
  restaurants: Restaurant[];
}