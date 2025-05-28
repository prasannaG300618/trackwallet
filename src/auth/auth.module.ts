import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DuplicateUserGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userDetailsSchema } from './schema/userDetails.schema';


@Module({
  imports:[MongooseModule.forFeature([{name:"userDetails" , schema: userDetailsSchema }])],
  controllers: [AuthController],
  providers:[DuplicateUserGuard, AuthService]
})
export class AuthModule {}
