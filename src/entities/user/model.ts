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
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  accessToken: string;

  @Column()
  friendToken: string;
}

export default User;
