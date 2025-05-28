import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {MongooseModule}  from '@nestjs/mongoose';


@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb+srv://prasannakithiyon53:Pras300618@cluster0.8fyvo.mongodb.net/trackWallet')], 
  controllers: [AppController],
  providers:[AppService]
})
export class AppModule {}
