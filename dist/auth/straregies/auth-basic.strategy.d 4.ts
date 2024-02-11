import { BasicStrategy as Strategy } from 'passport-http';
import { Request } from 'express';
declare const BasicStrategy_base: new (...args: any[]) => Strategy;
export declare class BasicStrategy extends BasicStrategy_base {
    constructor();
    validate: (req: Request) => Promise<boolean>;
}
export {};
