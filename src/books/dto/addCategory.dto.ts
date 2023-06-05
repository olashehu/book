import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDTO {
  @IsOptional()
  @IsString()
  id: number;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsOptional()
  @IsString()
  public readonly description: string;
}
