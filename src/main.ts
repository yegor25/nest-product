import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception.filter';
import { TrimPipe } from './trim.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes( new ValidationPipe({
    stopAtFirstError: true,
    exceptionFactory: (errors) => {
      const errorsResponse:Array<{message: string, field: string}> = []
      errors.forEach(e => {
        const firstKey = Object.keys(e.constraints as any)[0]
       if(e.constraints) errorsResponse.push( {message: e.constraints[firstKey], field: e.property})
      } )
      throw new BadRequestException(errorsResponse)
    }
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3002);
}
bootstrap();
