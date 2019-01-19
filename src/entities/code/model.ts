import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ValidEntity } from '../../decorators';
import * as randomatic from 'randomatic';

import { User } from '../';

@Entity()
export class Confirmation extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: () => true })
  isActive: boolean;

  @OneToOne(type => User, user => user.confirmation)
  user: Promise<User>;

  generateCode(): string {
    const code = randomatic('0A', 6);
    this.code = code;

    return code
  }
}

export enum types {
  REGISTRATION = 'REGISTRATION'
}
