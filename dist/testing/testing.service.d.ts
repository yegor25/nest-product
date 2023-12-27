import { UserRepository } from "src/users/user.repository";
export declare class TestingService {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    deleteAllData(): Promise<void>;
}
