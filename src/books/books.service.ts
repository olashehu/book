import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as shortid from 'shortid';

import { Book } from './models/book.model';
import { Category } from './category.model';
import { AddBookDTO } from './dto/addBook.dto';
import { UpdateBookDTO } from './dto/updateBook.dto';
import { SuccessResponseDTO } from './dto/successResponse.dto';
import { CategoryDTO } from './dto/addCategory.dto';

@Injectable()
export class BookService {
  private bookRepo: Repository<Book>;
  private categoryRepo: Repository<Category>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.bookRepo = this.entityManager.getRepository(Book);
    this.categoryRepo = this.entityManager.getRepository(Category);
  }

  async createBook(data: AddBookDTO): Promise<AddBookDTO> {
    try {
      const category = await this.categoryRepo.findOne({
        where: {
          id: data.categoryId,
        },
      });

      if (!category) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Category with the id ${data.categoryId} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const book: AddBookDTO = await this.bookRepo.save({
        id: shortid(),
        name: data.name,
        author: data.author,
        price: data.price,
        description: data.description,
        fileUrl: data.fileUrl,
        categoryId: data.categoryId,
        readTime: data.readTime,
        coverImage: data.coverImage,
        tags: data.tags,
        category: {
          id: data.categoryId,
        },
      });

      return book;
    } catch (err) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let error = 'Internal server error';
      if (err.status === HttpStatus.NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
        error = err.response.error;
      }
      throw new HttpException(
        {
          status,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateBook(data: UpdateBookDTO): Promise<SuccessResponseDTO> {
    try {
      const book = await this.bookRepo.findOne({
        where: {
          id: data.id,
        },
      });

      if (!book) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Book with the id ${data.id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const toUpdate: any = {};
      if (data.price) {
        toUpdate.price = data.price;
      }

      if (data.description) {
        toUpdate.description = data.description;
      }

      if (data.coverImage) {
        toUpdate.coverImage = data.coverImage;
      }

      if (data.readTime) {
        toUpdate.readTime = data.readTime;
      }

      await this.bookRepo.save({
        id: book.id,
        ...toUpdate,
      });

      return {
        success: true,
        message: 'Book updated successfully',
      };
    } catch (err) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let error = 'Internal server error';
      if (err.status === HttpStatus.NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
        error = err.response.error;
      }
      throw new HttpException(
        {
          status,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteBook(bookId: string): Promise<SuccessResponseDTO> {
    try {
      await this.bookRepo.delete({
        id: bookId,
      });

      return {
        success: true,
        message: 'Book deleted successfully',
      };
    } catch (err) {}
  }

  async getBook(bookId: string): Promise<Book> {
    try {
      const book = await this.bookRepo.findOne({
        where: {
          id: bookId,
        },
        relations: ['category'],
      });

      if (!book) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Book with the id ${bookId} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return book;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Internal server error`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchBooks(data) {
    try {
      const bookQuery = this.bookRepo.createQueryBuilder('book');

      if (data.author) {
        bookQuery.andWhere(`book.author =:author`, {
          author: data.author,
        });
      }

      if (data.categoryId) {
        bookQuery.andWhere(`book.categoryId =:categoryId`, {
          categoryId: data.categoryId,
        });
      }

      const books = await bookQuery.getMany();
      return {
        books,
        message: 'Fetched all books successfully',
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCategory(data: CategoryDTO): Promise<Category> {
    try {
      const category = await this.categoryRepo.save({
        name: data.name,
        description: data.description,
      });

      return category;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCategory(data) {
    try {
      const category = await this.categoryRepo.findOne({
        where: {
          id: data.id,
        },
      });

      if (!category) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Category with the id ${data.id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.categoryRepo.save({
        id: category.id,
        name: data.name,
      });

      return {
        message: 'Category updated successfully',
      };
    } catch (err) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let error = err.message;
      if (err.status === HttpStatus.NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
        error = err.response.error;
      }
      throw new HttpException(
        {
          status,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCategory(categoryId: number) {
    try {
      await this.categoryRepo.delete({
        id: categoryId,
      });

      return {
        success: true,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAllCategory() {
    try {
      return await this.categoryRepo.find();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
