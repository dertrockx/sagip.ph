import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ValidEntity } from '../../decorators';

import { User } from '../';

@Entity()
export class Distress extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column()
  nature: string;

  @Column()
  description: string;

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'double' })
  latitude: number;

  @ManyToOne(type => User, user => user.distress)
  user: Promise<User>;
}

export default Distress;
