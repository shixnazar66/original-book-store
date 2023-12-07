import { IsNumber, IsString } from "class-validator";
import { Rootentity } from "src/common/entity/root.entity";
import { Category } from "src/module/category/entities/category.entity";
import { Column, Entity, ManyToMany } from "typeorm";


@Entity()
export class Book extends Rootentity{
    @Column()
    bookname:string
    
    @Column()
    author:string

    @Column({nullable:true})
    viewcount:number

    @Column()
    booklanguage:string

    @Column({nullable:true})
    money:string

    @ManyToMany(() => Category, (category) => category.book)
    category:Category[]
}
