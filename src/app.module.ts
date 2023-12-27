import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { UserRepository } from './users/user.repository';
import { UserService } from './users/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/user.schema';
import { TestingController } from './testing/testing.controller';
import { TestingService } from './testing/testing.service';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forRoot(
      'mongodb+srv://lesnichij94:admin2411@cluster0.9f1tjb3.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController, UserController,TestingController],
  providers: [AppService, UserRepository, UserService, TestingService],
})
export class AppModule {}
