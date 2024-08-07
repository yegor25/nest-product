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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingService = void 0;
const common_1 = require("@nestjs/common");
const blogs_repository_1 = require("../blogs/blogs.repository");
const post_repository_1 = require("../posts/post.repository");
const superUsers_service_1 = require("../super-users/superUsers.service");
const user_repository_1 = require("../users/user.repository");
const sa_blogs_service_1 = require("../sa-blogs/sa.blogs.service");
const commentsSql_repository_1 = require("../comments/commentsSql.repository");
const quiz_repository_1 = require("../quiz/repositories/quiz.repository");
let TestingService = class TestingService {
    constructor(userRepository, blogRepository, postRepository, suService, saBlogsService, commentRepo, quizRepo) {
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
        this.postRepository = postRepository;
        this.suService = suService;
        this.saBlogsService = saBlogsService;
        this.commentRepo = commentRepo;
        this.quizRepo = quizRepo;
    }
    async deleteAllData() {
        await this.suService.deleteAll();
        await this.saBlogsService.deleteAll();
        await this.commentRepo.deleteAll();
        await this.quizRepo.deleteAll();
        return;
    }
};
exports.TestingService = TestingService;
exports.TestingService = TestingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        blogs_repository_1.BlogRepository,
        post_repository_1.PostRepository,
        superUsers_service_1.SuperUsersService,
        sa_blogs_service_1.SuperAdminBlogService,
        commentsSql_repository_1.CommentsSqlRepository,
        quiz_repository_1.QuizRepository])
], TestingService);
//# sourceMappingURL=testing.service.js.map