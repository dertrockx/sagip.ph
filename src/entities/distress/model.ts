import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ValidEntity } from '../../decorators';

@Entity()
export class Distress extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  @Column()
  case: string;

  @Column()
  longitude: string;

  @Column()
  latitude: string;
}

export default Distress;
