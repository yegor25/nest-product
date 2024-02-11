import { TokenRepository } from "./token.repository";
export declare class TokenService {
    private tokenRepository;
    constructor(tokenRepository: TokenRepository);
    save(userId: string, token: string): Promise<void>;
    find(userId: string, token: string): Promise<boolean>;
}
