import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../entities/user.entity';
import { Type } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class SignupDto {
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  lastName?: string | null;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password!: string;

  @IsEnum(UserRole)
  userRole!: UserRole;

  @Type(() => Date)
  @IsDate()
  dateOfBirth!: Date;
}

export class loginResponseDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName?: string | null;

  @IsString()
  token!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
