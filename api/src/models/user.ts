import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, getRepository } from 'typeorm';

import { ValidEntity } from '@decorators';
import { Confirmation, Distress, Comment } from '@models';

@Entity()
class User extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column({ select: false })
  accessToken: string;

  @Column({ select: false })
  friendToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', select: false })
  timestamp: Date;

  @Column({ default: () => true, select: false })
  isActive: boolean;

  @OneToOne(type => Confirmation, confirmation => confirmation.user)
  @JoinColumn()
  confirmation: Promise<Confirmation>;

  @OneToMany(type => Distress, distress => distress.user)
  distress: Promise<Distress[]>

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  confirmCode(code: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = this;
        const confirmation = await this.confirmation;

        if (confirmation && confirmation.code === code) {
          Object.assign(user, { confirmation: null });
          Object.assign(code, { isActive: false });
    
          await this.save();
          await confirmation.save();
  
          return resolve();
        }
  
        return reject({ error: 'Incorrect confirmation code', code: 400 });
      } catch(err) {
        return reject(err);
      }
    });
  }

  static getToken(userId: number) {
    const token = this.createQueryBuilder('user')
      .select(['accessToken', 'friendToken'])
      .where('id = :userId', { userId })
      .getRawOne();

    return token;
  }
}

export default User;