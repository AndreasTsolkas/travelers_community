import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { databaseSchemaName } from 'src/important';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';


@Entity({ schema: databaseSchemaName, name: 'has_read'})
export class HasRead {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' }) 
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'book_id' }) 
  book: Book;

  @Column({name: 'date_started' })
  dateStarted: Date;

  @Column({name: 'date_finished' })
  dateFinished: Date;

  @Column({name: 'enjoyness_level' })
  enjoynessLevel: number;

  @Column({name: 'would_suggest_it'})
  wouldSuggestIt: boolean;

}