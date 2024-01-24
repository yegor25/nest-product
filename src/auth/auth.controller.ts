import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common"
import { UserService } from "../users/user.service"
import { AuthService } from "./auth.service"
import {  CreateUserDtoType, User, loginDtoType } from "../users/user.schema"
import { AuthGuard } from "@nestjs/passport"
import {  Response, Request } from "express"
import { JwtAuthGuard } from "./guards/jwt-auth-guard"
import { TokenService } from "../tokens/token.service"
import { SecurityDevices } from "../securityDevices/securityDevices.schema"
import { SecurityDevicesService } from "src/securityDevices/securityDevices.service"


@Controller('auth')
export class AuthController {
    constructor(
        protected authService:AuthService,
        protected userService: UserService,
        protected tokenService:TokenService,
        protected securityDevicesService:SecurityDevicesService
    ) {}
    
    @HttpCode(200)
    @UseGuards(AuthGuard('local'))
    @Post('login')
     async loginUser(@Req() req:{user:User,ip: string, headers: {"user-agent": string | any}}, @Res() res: Response) {
        const ip = req.ip
        const title = req.headers["user-agent"] || "Chrome 105"
        const session = await this.securityDevicesService.create({ ip, title, userId: req.user._id.toString() })

        // const token = await jwtService.createAccesToken(user)
        // const refresh = await jwtService.createRefreshToken(user, session.deviceId)
        // res.cookie("refreshToken", refresh, { httpOnly: true, secure: true })
        // res.status(200).send({ accessToken: token })
        const credentials = await this.authService.login(req.user._id.toString(),session.deviceId)
        res.cookie("refreshToken", credentials.refreshToken, { httpOnly: true, secure: true })
        res.status(200).send({ accessToken: credentials.accessToken })
    }


    @HttpCode(204)
    @Post('registration-email-resending')
    async resendingEmail(@Body() body: {email: string}) {
        const validData = await this.userService.validateResendingUser(body.email)
        if(!validData) {
            throw new BadRequestException([{field: "email", message: "invalid data"}]);
        } 
            await this.authService.resendingEmail(body.email)
            return
    
    
    
    }

    @HttpCode(204)
    @Post('registration')
    async register(@Body() createUserDto: CreateUserDtoType) {
        const existUser = await this.userService.checkExistUser(createUserDto.email, createUserDto.login)
        if(existUser) {
            if(existUser.email === createUserDto.email){
                throw new BadRequestException([{field: "email", message: "already exist"}]);
            } else {
                throw new BadRequestException([{field: "login", message: "already exist"}]);
            }
        } 
        return this.authService.registerUser(createUserDto)
        
    }

    @HttpCode(204)
    @Post('registration-confirmation')
    async registerConfirmation(@Body() body: {code: string}) {
        const code = body.code
        const isConfirmed = await this.userService.checkCodeConfirmation(code)
        if(!isConfirmed) throw new BadRequestException([{field:"code", message: "invalid data"}])
        return
    }   
   
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async authMe(@Req() req:{user: { userId: string, login: string}}) {
            const user = await this.userService.findById(req.user.userId)
            if(user){
                return { email:user.email, login:req.user.login, userId:req.user.userId }
            }
            
        
        throw new UnauthorizedException();
    }

    @Post('logout')
    async logout(@Req() req:Request<{},{},{user:User},{}>, @Res() res: Response) {
        const token = req.cookies.refreshToken
        const userId = req.body.user._id.toString()
        await this.tokenService.save(userId, token)
        // await sessionService.deactivateSession(req.body.deviceId)
        res.clearCookie("refreshToken")
        res.sendStatus(204)
    }
    @Post('refresh-token')
    async refreshToken(@Req() req: Request<{},{},{user:User,deviceId: string},{}> ,@Res() res: Response) {
        const userId = req.body.user._id.toString()
        const credentials = await this.authService.login(userId,req.body.deviceId) 
        const token = req.cookies.refreshToken
        await this.tokenService.save(userId, token)
        await this.securityDevicesService.changeActiveDate(req.body.deviceId)
        res.cookie("refreshToken", credentials.refreshToken, { httpOnly: true, secure: true })
        res.status(200).send({ accessToken:credentials.accessToken })
    }
    // async recoverPass(req: requestWithBody<{ email: string }>, res: Response) {
    //     await this.authService.recoverPassword(req.body.email)
    //     res.sendStatus(204)
    // }
    // async changePswd(req: requestWithBody<{ newPassword: string, recoveryCode: string }>, res: Response) {
    //     const { newPassword, recoveryCode } = req.body
    //     await this.userService.recoverPassword(newPassword, recoveryCode)
    //     res.sendStatus(204)
    // }
}