import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {databaseSchemaName} from 'src/important';
import { User } from 'src/user/user.entity';

@Entity({ schema: databaseSchemaName, name: 'travel'})
export class Travel {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;
  
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' }) 
  user: User;

  @Column({name: 'date_started' })
  dateStarted: Date;

  @Column({name: 'date_finished' })
  dateFinished: Date;

  @Column({name: 'experience_rate' })
  experienceRate: number;

  @Column({name: 'description', type: 'varchar', length: 2000})
  description: string;

  @Column({name: 'place', type: 'varchar', length: 30})
  place: string;

  @Column({name: 'country', type: 'varchar', length: 30})
  country: string;

  @Column({name: 'business_travel'})
  businessTravel: boolean;

  @Column({name: 'suggest_it'})
  suggestIt: boolean;


  
}