import { IsOptional, IsString } from 'class-validator';

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  public readonly id: string;

  @IsString()
  @IsOptional()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly price: number;

  @IsString()
  @IsOptional()
  public readonly description: string;

  @IsString()
  @IsOptional()
  public readonly coverImage: string;

  @IsString()
  @IsOptional()
  public readonly readTime: number;
}
