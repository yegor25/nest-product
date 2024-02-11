import { Module } from "@nestjs/common";
import { SuperUserController } from "./superUsers.controller";
import { SuperUsersService } from "./superUsers.service";
import { SuperUserRepository } from "./superUsers.repositoru";
import { SuValidatorEmail } from "./validators/su.validate-email";
import { SuValidatorLogin } from "./validators/su.validate-login";


@Module({
    controllers: [SuperUserController],
    providers: [SuperUsersService, SuperUserRepository, SuValidatorEmail,SuValidatorLogin],
    exports: [SuperUsersService]
  })
  export class SuperUsersModule {}