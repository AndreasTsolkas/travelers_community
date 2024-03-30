import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {databaseSchemaName} from 'src/important';

@Entity({ schema: databaseSchemaName, name: 'book'})
export class Book {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;
  
  @Column({name: 'title', type: 'varchar', length: 30})
  title: string;

  @Column({name: 'gender', type: 'varchar', length: 20})
  gender: string;

  @Column({name: 'pages', type: 'int', length: 8 })
  pages: number;

  @Column({name: 'publication_date' })
  publicationDate: Date;

  @Column({name: 'author', type: 'varchar', length: 30 })
  author: string;

}