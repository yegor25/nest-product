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
} from '@nestjs/common';
import { UserService } from './user.service';
import { paramsUserPaginatorType, CreateUserDtoType } from './user.schema';


@Controller('users')
export class UserController {
  constructor(protected userService: UserService) {}
  @Get()
  async getUsers(@Query() query: paramsUserPaginatorType) {
    return this.userService.findUsers(query);
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDtoType) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getPosts(){
    
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return [
      { id: 1, name: 'Sam' },
      { id: 2, name: 'John' },
    ].find((u) => u.id === +userId);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') userId: string) {
    const deletedUser = await this.userService.deleteUser(userId);
    if (!deletedUser) throw new NotFoundException();
    return;
  }
}
