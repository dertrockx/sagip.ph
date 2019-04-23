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

  static async purge() {
    const toPurge = await this.createQueryBuilder('distress')
      .select(['id', 'TIMESTAMPDIFF(MINUTE, distress.timestamp, NOW()) AS age'])
      .having('age > :maxAge', { maxAge: 60 * 60 })
      .getRawMany();

    for (const distress of toPurge) {
      const purge = await this.findOne(distress.id);
      purge.isActive = false;
      await purge.save();
    }
  }
}

export default Distress;
