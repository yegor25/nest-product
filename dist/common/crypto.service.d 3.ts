declare class CryptoService {
    genSalt(): Promise<string>;
    genHash(password: string): Promise<{
        salt: string;
        hash: string;
    }>;
}
export declare const cryptoService: CryptoService;
export {};
