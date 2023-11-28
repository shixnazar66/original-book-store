import { Rootentity } from 'src/common/entity/root.entity';
import { UserRole } from 'src/common/enum/user-role.enum';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User extends Rootentity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ enum: UserRole, type: 'enum', default: UserRole.user })
  role: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refresh_token: string;
}
