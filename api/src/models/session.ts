import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { ISession } from 'connect-typeorm';
import { Bigint } from 'typeorm-static';

@Entity()
class Session implements ISession {
  @Index()
  @Column('bigint', { transformer: Bigint })
  public expiredAt = Date.now();

  @PrimaryColumn('varchar', { length: 255 })
  public id = '';

  @Column('text')
  public json = '';
}

export default Session;
