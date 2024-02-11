import { TokenRepository } from "./token.repository";
import { TokenSqlRepository } from "./tokenSql.repository";
export declare class TokenService {
    private tokenRepository;
    private tokenSqlRepository;
    constructor(tokenRepository: TokenRepository, tokenSqlRepository: TokenSqlRepository);
    save(userId: string, token: string): Promise<void>;
    find(userId: string, token: string): Promise<boolean>;
}
