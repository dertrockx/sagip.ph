import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ValidEntity } from '@decorators';

@Entity()
class Sms extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column()
  message: string;

  @Column()
  messageId: string;

  @Column()
  fragments: number;

  @Column({ nullable: true })
  multipartId: number;

  @Column({ nullable: true })
  multipartRef: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}

export enum types {
  REGISTRATION = 'REGISTRATION',
}

export default Sms;
