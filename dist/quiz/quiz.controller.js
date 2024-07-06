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
exports.SuperAdminQuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("./quiz.service");
const basic_auth_guard_1 = require("../auth/guards/basic-auth.guard");
const quiz_entity_1 = require("./quiz.entity");
let SuperAdminQuizController = class SuperAdminQuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    async findAll(query) {
        return this.quizService.findAll(query);
    }
    async create(body) {
        return this.quizService.create(body);
    }
    async update(param, body) {
        const mod = await this.quizService.updateQuestion(param.id, body);
        if (!mod) {
            throw new common_1.NotFoundException();
        }
        return;
    }
    async updatePublish(param, body) {
        if (typeof body.published == "boolean") {
            throw new common_1.BadRequestException();
        }
        const mod = await this.quizService.updatePublis(param.id, body.published);
        if (!mod) {
            throw new common_1.NotFoundException();
        }
        return;
    }
    async deleteQuestion(param) {
        const del = await this.quizService.deleteQuestion(param.id);
        if (!del) {
            throw new common_1.NotFoundException();
        }
        return;
    }
};
exports.SuperAdminQuizController = SuperAdminQuizController;
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Get)("quiz/questions"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminQuizController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Post)("quiz/questions"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quiz_entity_1.CreatedQuestions]),
    __metadata("design:returntype", Promise)
], SuperAdminQuizController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Put)("quiz/questions/:id"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, quiz_entity_1.CreatedQuestions]),
    __metadata("design:returntype", Promise)
], SuperAdminQuizController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Put)("quiz/questions/:id/publish"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminQuizController.prototype, "updatePublish", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Delete)("quiz/questions/:id"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminQuizController.prototype, "deleteQuestion", null);
exports.SuperAdminQuizController = SuperAdminQuizController = __decorate([
    (0, common_1.Controller)("sa"),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], SuperAdminQuizController);
//# sourceMappingURL=quiz.controller.js.map