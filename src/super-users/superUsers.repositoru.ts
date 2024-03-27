import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import {
  CreateUserDtoType,
  CreatedUserDtoDbType,
  ResponseAllUserDto,
  SortDirection,
  paramsUserPaginatorType,
} from "../users/user.schema";
import { DataSource, Repository } from "typeorm";
import { userHelper } from "../users/user.helper";
import { Users } from "../users/entities/user.entity";

@Injectable()
export class SuperUserRepository {
  constructor(
    @InjectDataSource() protected dataSourse: DataSource,
    @InjectRepository(Users) protected userRepo: Repository<Users>
  ) {}
  async create(
    dto: CreatedUserDtoDbType
  ): Promise<{ id: string; createdAt: string }> {
    // const user = await this.dataSourse.query<{id: string, createdAt: string}[]>(`
    //     insert into public."Users"
    //     ("email","login","passwordSalt","passwordHash","isActiveAccount","createdAt")
    //     values('${dto.email}','${dto.login}','${dto.passwordSalt}','${dto.hashPassword}','true','${new Date().toISOString()}')
    //     returning "id","createdAt"
    // ;
    // `)
    const user = await this.userRepo
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        email: dto.email,
        login: dto.login,
        passwordHash: dto.hashPassword,
        passwordSalt: dto.passwordSalt,
        isActiveAccount: true,
        createdAt: new Date().toISOString(),
      })
      .returning(["id", "createdAt"])
      .execute();
    const res: { id: string; createdAt: string } = user.raw[0];
    return { id: res.id, createdAt: res.createdAt };
  }

  async checkByEmail(email: string): Promise<boolean> {
    // const user = await this.dataSourse.query(`
    //         SELECT * from public."Users" u
    //         WHERE u."email" = '${email}';
    //     `);
    const user = await this.userRepo
      .createQueryBuilder()
      .select()
      .where("email = :email", { email })
      .getOne();
    if (user) return true;
    return false;
  }
  async checkByLogin(login: string): Promise<boolean> {
    // const user = await this.dataSourse.query(
    //   `
    //         SELECT * from public."Users" u
    //         WHERE u."login" = $1;
    //     `,
    //   [login]
    // );
    const user = await this.userRepo
      .createQueryBuilder()
      .select()
      .where("login = :login", { login })
      .getOne();
    if (user) return true;
    return false;
  }

  async deleteAll() {
    // return this.dataSourse.query(`
    //     Truncate public."Users" Cascade;
    //     `);
    await this.userRepo.createQueryBuilder().delete().from(Users).execute();
    return;
  }

  async findById(id: string) {
    // const user = await this.dataSourse.query(
    //   `
    //         Select * from public."Users" u
    //         WHERE u."id" = $1;
    //     `,
    //   [id]
    // );
    const user = await this.userRepo
      .createQueryBuilder()
      .select()
      .where("id = :id", { id })
      .getOne();
    return user;
  }

  async deleteUser(id: string) {
    // const user = await this.dataSourse.query(
    //   `
    //         Delete from public."Users" u
    //         WHERE u."id" = $1;
    //     `,
    //   [id]
    // );
    const user = await this.userRepo
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where("id = :id", { id })
      .execute();
    if (user.affected === 1) return true;
    return false;
  }
  async finddAll(params: paramsUserPaginatorType): Promise<ResponseAllUserDto> {
    const parametres = userHelper.usersParamsMapper(params);
    const skipCount =
      (+parametres.pageNumber - 1) * Number(parametres.pageSize);
    const loginTerm = params.searchLoginTerm ? params.searchLoginTerm : "";
    const emailTerm = params.searchEmailTerm ? params.searchEmailTerm : "";
    const sortDirection = params.sortDirection
      ? params.sortDirection
      : SortDirection.desc;
    const queryTotalCountString = `
            select count(*)
            from public."Users" u
            where u."login" ilike '%${loginTerm}%' OR u."email" ilike '%${emailTerm}%';
        `;
    const queryUserString = `
            select u."email",u."login",u."id",u."createdAt"
            from public."Users" u
            where  u."login"  ilike  '%${loginTerm}%' OR u."email" ilike '%${emailTerm}%'
            order by u."${parametres.sortBy}" ${sortDirection}
            limit ${+parametres.pageSize} offset ${skipCount}
            ;
        `;
    // const totalCount = await this.dataSourse.query<{ count: string }[]>(
    //   queryTotalCountString
    // );
    // const users = await this.dataSourse.query(queryUserString);
    const totalCount = await this.userRepo
    .createQueryBuilder()
    .where("login ilike :loginTerm OR email ilike :emailTerm", {
        loginTerm: `%${loginTerm}%`,
        emailTerm: `%${emailTerm}%`,
      })
      .getCount()
    ;
      console.log("total", totalCount)
    const users = await this.userRepo
      .createQueryBuilder("u")
      .select(`"id","login","email",u."createdAt"`)
      .where("login ilike :loginTerm OR email ilike :emailTerm", {
        loginTerm: `%${loginTerm}%`,
        emailTerm: `%${emailTerm}%`,
      })
      .orderBy(
        `u.${parametres.sortBy}`,
        `${sortDirection}`
      )
      .take(+parametres.pageSize)
      .skip(skipCount)
      .execute();
    const result: ResponseAllUserDto = {
      pagesCount: Math.ceil(totalCount / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: +parametres.pageSize,
      totalCount: totalCount,
      items: users,
    };
    return result;
  }
}
