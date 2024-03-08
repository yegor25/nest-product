"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const exception_filter_1 = require("./exception.filter");
const class_validator_1 = require("class-validator");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, cookie_parser_1.default)());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
        exceptionFactory: (errors) => {
            const errorsResponse = [];
            errors.forEach(e => {
                const firstKey = Object.keys(e.constraints)[0];
                if (e.constraints)
                    errorsResponse.push({ message: e.constraints[firstKey], field: e.property });
            });
            throw new common_1.BadRequestException(errorsResponse);
        }
    }));
    app.useGlobalFilters(new exception_filter_1.HttpExceptionFilter());
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map