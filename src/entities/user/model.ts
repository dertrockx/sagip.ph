import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ValidEntity } from '../../decorators';

import { Confirmation } from '../';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: () => true })
  isActive: boolean;

  @OneToMany(type => Confirmation, confirmation => confirmation.user)
  confirmation: string;
}

export default User;
