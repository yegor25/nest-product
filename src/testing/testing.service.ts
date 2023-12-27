import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/users/user.repository";


@Injectable()
export class TestingService {
    constructor(protected userRepository: UserRepository){}
    async deleteAllData(){
        await this.userRepository.deleteAll()
    }
}