import { Rootentity } from "src/common/entity/root.entity";
import { Book } from "src/module/book/entities/book.entity";
import { User } from "src/module/user/entities/user.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity()
export class Saved extends Rootentity {
  @ManyToOne((saved) => User)
  user: User;

  @ManyToOne((saved) => Book)
  book: Book;
}
