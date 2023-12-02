import { IsString } from "class-validator";
import { Rootentity } from "src/common/entity/root.entity";
import { Book } from "src/module/book/entities/book.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
  

@Entity()
export class Category extends Rootentity{

    @Column()
    categoryname:string

    @ManyToMany(() => Book, (book) => book.category, {cascade:true})
    @JoinTable()
    book:Book[]
}
