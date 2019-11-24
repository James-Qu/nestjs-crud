import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { productsModule } from './products.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  // tslint:disable-next-line:max-line-length
  imports: [productsModule, MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kq39r.mongodb.net/nestjs-crud?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
