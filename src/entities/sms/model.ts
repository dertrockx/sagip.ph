import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ValidEntity } from '../../decorators';

@Entity()
export class Sms extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column()
  message: string;

  @Column()
  fragments: number;

  @Column()
  multipartRef: string;

  @Column()
  multipartId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}

export enum types {
  REGISTRATION = 'REGISTRATION',
}
