import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddBookDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly author: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly price: number;

  @IsOptional()
  @IsString()
  public readonly description: string;

  @IsString()
  @IsNotEmpty()
  public readonly coverImage: string;

  @IsString()
  @IsNotEmpty()
  public readonly fileUrl: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  public readonly readTime: number;

  @IsOptional()
  public readonly tags: string[];
}
