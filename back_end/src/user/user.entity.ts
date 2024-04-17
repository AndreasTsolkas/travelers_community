import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {databaseSchemaName} from 'src/important';

@Entity({ schema: databaseSchemaName, name: 'user'})
export class User {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;
  
  @Column({name: 'first_name', type: 'varchar', length: 20})
  firstName: string;

  @Column({name: 'last_name', type: 'varchar', length: 20})
  lastName: string;

  @Column({name: 'age' })
  age: number;

  @Column({name: 'sex', type: 'char' })
  sex: number;

  @Column({name: 'nationality', type: 'varchar', length: 20})
  nationality: string;

  @Column({name: 'country', type: 'varchar', length: 20})
  country: string;

  @Column({name: 'email', type: 'varchar', length: 30})
  email: string;

  @Column({name: 'password', type: 'varchar', length: 30})
  password: string;

  @Column({name: 'username', type: 'varchar', length: 20})
  username: string;

  @Column({name: 'date_signed' })
  dateSigned: Date;

  @Column({name: 'avatar_filepath', type: 'varchar', length: 30 })
  avatarFilepath: string;

}