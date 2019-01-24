import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ValidEntity } from '@decorators';
import { User, Distress } from '@models';

@Entity()
class Comment extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: () => true })
  isActive: boolean;

  @ManyToOne(type => User, user => user.comments)
  user: Promise<User>;

  @ManyToOne(type => Distress, distress => distress.comments)
  distress: Promise<Distress>;
}

export default Comment;
