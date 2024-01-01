import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            passReqToCallback: true
        });
    }

    public validate = async (req:Request): Promise<boolean> => {
        const user = req.headers["authorization"]
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    const isBase64 = base64regex.test(user?.split(" ").splice(1, 1).join("") as string)
    if(!user || !isBase64) throw new UnauthorizedException();
        const encode = atob(user?.split(" ").splice(1, 1).join(" ") as string)
        const encodeArray = encode.split(":")
        if (encodeArray.length !== 2) throw new UnauthorizedException();
        if (encodeArray[0] === "admin" && encodeArray[1] === "qwerty") {
            return true
        } else {
            return false
        }
    }
}