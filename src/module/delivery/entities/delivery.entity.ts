import { IsString, isNotEmpty } from "class-validator";
import { Rootentity } from "src/common/entity/root.entity";
import { Book } from "src/module/book/entities/book.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity()
export class Delivery extends Rootentity{
    @ManyToOne((Delivery) => User)
    user:User

    @ManyToOne((Delivery) => Book)
    book:Book

    @Column()
    address:string
}
