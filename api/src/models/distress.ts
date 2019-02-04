import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { ValidEntity } from '@decorators';
import { User, Comment } from '@models';

@Entity()
class Distress extends ValidEntity {
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

  @Column({ default: () => true })
  isActive: boolean;

  @ManyToOne(type => User, user => user.distress)
  user: Promise<User>;

  @OneToMany(type => Comment, comment => comment.distress)
  comments: Promise<Comment[]>
}

export default Distress;
