"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const exception_filter_1 = require("./exception.filter");
const trim_pipe_1 = require("./trim.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new trim_pipe_1.TrimPipe(), new common_1.ValidationPipe({
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