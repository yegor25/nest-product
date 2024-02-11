import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Query, UseGuards } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { BasicAuthGuard } from "../auth/guards/basic-auth.guard";
import { DataSource } from "typeorm";
import { CreateUserDtoType, paramsUserPaginatorType } from "../users/user.schema";
import { SuperUsersService } from "./superUsers.service";
import { CreateSuDtoType } from "./su.schema";

@Controller("sa")
export class SuperUserController {
  constructor(
    protected superUsersService: SuperUsersService,
    @InjectDataSource() protected dataSorce: DataSource
    ) {}

  @Get()
  async getAllUsers() {
    return this.dataSorce.query(`
    SELECT * from public."Users";
        `);
  }

  @UseGuards(BasicAuthGuard)
  @Post("users")
  async createUser(@Body() createUserDto: CreateSuDtoType) {
    return this.superUsersService.create(createUserDto);
  }

  @UseGuards(BasicAuthGuard)
  @Delete('users/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') userId: string) {
    const deletedUser = await this.superUsersService.deleteUser(userId);
    if (!deletedUser) throw new NotFoundException();
    return;
  }

  @Get("users")
  async getUsers(@Query() query: paramsUserPaginatorType) {
    return this.superUsersService.findAll(query);
  }
}
