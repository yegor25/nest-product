import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { SuperUsersService } from "../superUsers.service";
export declare class SuValidatorEmail implements ValidatorConstraintInterface {
    protected suService: SuperUsersService;
    constructor(suService: SuperUsersService);
    validate(value: string): Promise<boolean>;
    defaultMessage(validationArguments?: ValidationArguments | undefined): string;
}
