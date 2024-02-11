import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { SuperUsersService } from "../superUsers.service";
import { Injectable } from "@nestjs/common";



@Injectable()
@ValidatorConstraint({name:"suValidator", async:true})
export class SuValidatorLogin implements ValidatorConstraintInterface {
    constructor(
        protected suService: SuperUsersService,
    ){}

    async validate(value: string):  Promise<boolean> {
        if(!value) return false
        const user = await this.suService.checkLogin(value)
        if(user) return false
        return true
     }

     defaultMessage(validationArguments?: ValidationArguments | undefined): string {
         return "invalid login"
     }
}