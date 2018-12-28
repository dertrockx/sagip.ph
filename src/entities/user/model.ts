import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ValidEntity } from '../../decorators';

@Entity()
export class User extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

export default User;
