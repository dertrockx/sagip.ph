import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ValidEntity } from '../../decorators';

import { Confirmation, Distress } from '../';

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

  @OneToOne(type => Confirmation, confirmation => confirmation.user)
  @JoinColumn()
  confirmation: Promise<Confirmation>;

  @OneToMany(type => Distress, distress => distress.user)
  distress: Promise<Distress[]>

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
  
        return reject({ error: 'Incorrect confirmation code' });
      } catch(err) {
        return reject(err);
      }
    });
  }
}

export default User;
