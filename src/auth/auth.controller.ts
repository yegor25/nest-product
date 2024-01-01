import { BadRequestException, Body, Controller, HttpCode, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common"
import { UserService } from "../users/user.service"
import { AuthService } from "./auth.service"
import {  CreateUserDtoType, User, loginDtoType } from "../users/user.schema"
import { AuthGuard } from "@nestjs/passport"


@Controller('auth')
export class AuthController {
    constructor(
        protected authService:AuthService,
        protected userService: UserService
    ) {}
    
    @HttpCode(200)
    @UseGuards(AuthGuard('local'))
    @Post('login')
     async loginUser(@Req() req:{user:User},@Body() body: loginDtoType) {
        // const ip = req.ip
        // const title = req.headers["user-agent"] || "Chrome 105"
        // const session = await this.authService.saveSession({ ip, title, userId: user?._id.toString() })

        // const token = await jwtService.createAccesToken(user)
        // const refresh = await jwtService.createRefreshToken(user, session.deviceId)
        // res.cookie("refreshToken", refresh, { httpOnly: true, secure: true })
        // res.status(200).send({ accessToken: token })
        return this.authService.login(body)
    }

    @HttpCode(204)
    @Post('registration')
    async register(@Body() createUserDto: CreateUserDtoType) {
        const newUser = await this.authService.registerUser(createUserDto)
        if(newUser) {
            if(newUser.email === createUserDto.email){
                throw new BadRequestException([{field: "email", message: "already exist"}]);
            } else {
                throw new BadRequestException([{field: "login", message: "already exist"}]);
            }
        } 
        return;    
    }

    @HttpCode(204)
    @Post('registration-confirmation')
    async registerConfirmation(@Body() body: {code: string}) {
        const code = body.code
        const isConfirmed = await this.authService.confirmUser(code)
        if(!isConfirmed) throw new BadRequestException([{field:"code", message: "invalid data"}])
        return
    }   

    // @HttpCode(204)
    // @Post('registration-email-resending')
    // async resendingEmail(@Body() body: {email: string}) {
    // const validData = await this.userService.validateResendingUser(body.email)
    // if(!validData) throw new BadRequestException([{field: "email", message: "invalid data"}])
    // return this.authService.resendingEmail(body.email)
       
    // }
    // async authMe(req: Request, res: Response) {
    //     if (req.user) {
    //         const { email, login, _id } = req.user
    //         const userId = _id.toString()
    //         res.status(200).send({ email, login, userId })
    //         return
    //     }
    //     res.sendStatus(401)
    // }
    // async logout(req: Request, res: Response) {
    //     if (req.user) await this.authService.saveOldToken(req.cookies.refreshToken, req.user?._id.toString() as string)
    //     await sessionService.deactivateSession(req.body.deviceId)
    //     res.clearCookie("refreshToken")
    //     res.sendStatus(204)
    // }
    // async refreshToken(req: Request, res: Response) {
    //     const user = req.user as userDbType
    //     if (user) await this.authService.saveOldToken(req.cookies.refreshToken, req.user?._id.toString() as string)
    //     const refreshToken = await jwtService.createRefreshToken(user, req.body.deviceId)
    //     const accessToken = await jwtService.createAccesToken(user)
    //     await sessionService.changectiveDate(req.body.deviceId)
    //     res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    //     res.status(200).send({ accessToken })
    // }
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