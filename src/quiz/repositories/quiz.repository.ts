import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreatedQuestions, Questions, paramsQuestionsPaginatorType } from "../quiz.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SortDirection } from "../../users/user.schema";

@Injectable()
export class QuizRepository {
  constructor(
    @InjectRepository(Questions) protected questionRepo: Repository<Questions>
  ) {}

  async create(dto: CreatedQuestions):Promise<any>{
    const newQuestion = await this.questionRepo.createQueryBuilder("c")
    .insert()
    .into(Questions)
    .values({...dto})
    .returning(`id, body,published, "correctAnswers","createdAt","updatedAt"`)
    .execute()

    return newQuestion.raw[0]
  }

  async delete(id: string):Promise<boolean>{
    const deleted  = await this.questionRepo.createQueryBuilder()
    .delete()
    .from(Questions)
    .where("id = :id", { id })
    .execute();
    if(deleted.affected === 1) return true
    return false
  }

  async update(body: string, correctAnswers: string[], id: string):Promise<boolean>{
    const changing = await this.questionRepo
    .createQueryBuilder()
    .update(Questions)
    .set({ body,correctAnswers})
    .where("id = :id", { id })
    .execute();
    console.log("2",changing)
  if (changing.affected === 1) return true;
  return false;
  }

  async updatePublish(id: string, publish: boolean):Promise<boolean>{
    const mod = await this.questionRepo.createQueryBuilder()
    .update(Questions)
    .set({published: publish})
    .where("id = :id", {id})
    .execute()
    if(mod.affected === 1) return true
    return false
  }

  async findAllQuestions(params: paramsQuestionsPaginatorType){
    const pageNumber = params.pageNumber ? +params.pageNumber : 1
    const pageSize = params.pageSize ? +params.pageSize : 10

    const skipCount = (pageNumber - 1) * pageSize;
    const sortDirection = params.sortDirection ? params.sortDirection : SortDirection.desc
    const term = params.bodySearchTerm ? params.bodySearchTerm : ""
    const sortBy = params.sortBy ? params.sortBy : "createdAt"

    const questions = await this.questionRepo.createQueryBuilder("q")
    .where(`q.body ilike :term`, {term: `%${term}%`})
    .orderBy(`q.${sortBy}`,`${sortDirection as SortDirection}`)
    .take(pageSize)
    .skip(skipCount)
    .getMany()
    
    const totalCount = await this.questionRepo.createQueryBuilder("q")
    .where(`q.body ilike :term`, {term: `%${term}%`})
    .getCount()

    return {
        pagesCount: Math.ceil(totalCount/ pageSize),
        page: pageNumber,
        pageSize: pageSize,
        totalCount: totalCount,
        items: questions
    }

    

  }
  async deleteAll (){
    await this.questionRepo.createQueryBuilder().delete().from(Questions).execute()
    return
  }
}
//