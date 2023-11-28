import { Entity,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";

@Entity()
export class Rootentity{
@PrimaryGeneratedColumn()
id:number

@CreateDateColumn()
created_at:Date

@UpdateDateColumn()
update_at:Date
}