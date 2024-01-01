import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { paramsUserPaginatorType, CreateUserDtoType } from './user.schema';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';


@Controller('users')
export class UserController {
  constructor(protected userService: UserService) {}
  @Get()
  async getUsers(@Query() query: paramsUserPaginatorType) {
    return this.userService.findUsers(query);
  }

  @UseGuards(BasicAuthGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDtoType) {
    return this.userService.createUser(createUserDto);
  }

  

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return [
      { id: 1, name: 'Sam' },
      { id: 2, name: 'John' },
    ].find((u) => u.id === +userId);
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') userId: string) {
    const deletedUser = await this.userService.deleteUser(userId);
    if (!deletedUser) throw new NotFoundException();
    return;
  }
}
