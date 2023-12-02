import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { env } from './env.config';
import { User } from 'src/module/user/entities/user.entity';
import { Auth } from 'src/module/auth/entities/auth.entity';
import { Book } from 'src/module/book/entities/book.entity';
import { Category } from 'src/module/category/entities/category.entity';
import { Saved } from 'src/module/saved/entities/saved.entity';
import { Delivery } from 'src/module/delivery/entities/delivery.entity';

export const typeormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [User,Auth,Book,Category,Saved,Delivery],
  synchronize: true,
};