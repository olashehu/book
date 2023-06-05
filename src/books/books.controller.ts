import {
  Controller,
  Inject,
  Get,
  Req,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BookService } from './books.service';
import { AddBookDTO } from './dto/addBook.dto';
import { SuccessResponseDTO } from './dto/successResponse.dto';
import { UpdateBookDTO } from './dto/updateBook.dto';

@Controller('/v1')
export class BookController {
  constructor(
    @Inject(BookService)
    private readonly bookService: BookService,
  ) {}

  @Post('/books')
  async createBook(@Body() data: AddBookDTO): Promise<AddBookDTO> {
    return this.bookService.createBook(data);
  }

  @Put('/books/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() body: UpdateBookDTO,
  ): Promise<SuccessResponseDTO> {
    return this.bookService.updateBook({
      id: id,
      ...body,
    });
  }

  @Delete('/books/:id')
  async deleteBook(@Req() data: any): Promise<any> {
    return this.bookService.deleteBook(data.params);
  }

  @Get('/books')
  async fetchBooks(@Req() data: any): Promise<any> {
    return this.bookService.fetchBooks(data.query);
  }

  @Get('/books/:id')
  async getBook(@Req() data: any): Promise<any> {
    return this.bookService.getBook(data.params.id);
  }

  @Post('/categories')
  async createCategory(@Req() data: any): Promise<any> {
    return this.bookService.createCategory(data.body);
  }

  @Get('/categories')
  async fetchCategory(@Req() data: any): Promise<any> {
    return this.bookService.fetchAllCategory();
  }

  @Delete('/categories/:id')
  async deleteCategory(@Req() data: any): Promise<any> {
    return this.bookService.deleteCategory(data.params.id);
  }
}
