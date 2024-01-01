import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './straregies/local.srategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//         secret:jwtConstants.secret,
//         signOptions: {expiresIn: "15m"}
//     })
// ],
//   providers: [AuthService, UserService, LocalStrategy],
// })
// export class AuthModule {}
