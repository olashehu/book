import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class SuccessResponseDTO {
  @IsOptional()
  message: string;

  @IsBoolean()
  @IsNotEmpty()
  public readonly success: boolean;
}
