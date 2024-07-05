"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRepository = void 0;
const common_1 = require("@nestjs/common");
const quiz_entity_1 = require("../quiz.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_schema_1 = require("../../users/user.schema");
let QuizRepository = class QuizRepository {
    constructor(questionRepo) {
        this.questionRepo = questionRepo;
    }
    async create(dto) {
        const newQuestion = await this.questionRepo.createQueryBuilder("c")
            .insert()
            .into(quiz_entity_1.Questions)
            .values({ ...dto })
            .returning(`id, body,published, "correctAnswers","createdAt","updatedAt"`)
            .execute();
        return newQuestion.raw[0];
    }
    async delete(id) {
        const deleted = await this.questionRepo.createQueryBuilder()
            .delete()
            .from(quiz_entity_1.Questions)
            .where("id = :id", { id })
            .execute();
        if (deleted.affected === 1)
            return true;
        return false;
    }
    async update(body, correctAnswers, id) {
        const changing = await this.questionRepo
            .createQueryBuilder()
            .update(quiz_entity_1.Questions)
            .set({ body, correctAnswers })
            .where("id = :id", { id })
            .execute();
        if (changing.affected === 1)
            return true;
        return false;
    }
    async updatePublish(id, publish) {
        const mod = await this.questionRepo.createQueryBuilder()
            .update(quiz_entity_1.Questions)
            .set({ published: publish })
            .where("id = :id", { id })
            .execute();
        if (mod.affected === 1)
            return true;
        return false;
    }
    async findAllQuestions(params) {
        const skipCount = (+params.pageNumber - 1) * +params.pageSize;
        const sortDirection = params.sortDirection ? params.sortDirection : user_schema_1.SortDirection.desc;
        const term = params.bodySearchTerm ? params.bodySearchTerm : "";
        const sortBy = params.sortBy ? params.sortBy : "createdAt";
        const questions = await this.questionRepo.createQueryBuilder("q")
            .select()
            .where(`q.body ilike :term`, { term })
            .orderBy(`q.${sortBy}`, `${sortDirection}`)
            .take(+params.pageSize)
            .skip(skipCount)
            .getMany();
        const totalCount = await this.questionRepo.createQueryBuilder("q")
            .where(`q.body ilike :term`, { term })
            .getCount();
        return {
            pagesCount: Math.ceil(totalCount / +params.pageSize),
            page: +params.pageNumber,
            pageSize: +params.pageSize,
            totalCount,
            items: questions
        };
    }
};
exports.QuizRepository = QuizRepository;
exports.QuizRepository = QuizRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Questions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuizRepository);
//# sourceMappingURL=quiz.repository.js.map