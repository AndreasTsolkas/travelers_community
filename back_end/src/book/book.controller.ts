import { Body, Controller, Delete, Get, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { AuthGuard } from 'src/auth.guard';

@UseGuards(AuthGuard)
@Controller('book')
export class  BookController {
  
  constructor(private bookService: BookService) {

  }

  @Get('/all')
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: any) {
    return await this.bookService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() bookData: Partial<Book>) {
    return this.bookService.update(id, bookData);
  }

  @Put()
  async create(@Body() bookData: Partial<Book>) {
    return this.bookService.create(bookData);
  }
  
}