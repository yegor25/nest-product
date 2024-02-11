import { Transform } from "class-transformer";
import { IsNotEmpty, MinLength, MaxLength, IsEmail, Matches, Validate } from "class-validator";
import { SuValidatorEmail } from "./validators/su.validate-email";
import { SuValidatorLogin } from "./validators/su.validate-login";

export class CreateSuDtoType  {

    @Transform(({value}) => (value.trim()))
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(10)
    @Validate(SuValidatorLogin)
    login: string;
  
    @MinLength(6)
    @MaxLength(20)
    password: string;
  
    @IsEmail()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    @Validate(SuValidatorEmail)
    email: string;
  };