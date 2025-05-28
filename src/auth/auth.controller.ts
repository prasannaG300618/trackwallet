import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DuplicateUserGuard } from './guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { userDto } from './dto/userDetails.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Get("login")
    login(loginCredential:userDto){
        return this.authService.login(loginCredential.userName)
    }
    
    @Post("register")
    @UseGuards(DuplicateUserGuard)
    register(@Body() data:userDto){
        return this.authService.registerUser(data)
    }

    @Patch("transaction")
    async transaction(@Body() updateDetails){
        console.log(updateDetails)
    return await this.authService.transaction(updateDetails.value, updateDetails.type, updateDetails.userName, updateDetails.source)   
    }
    @Put("customoption")
    async customOption(@Body() customData:{userName:string, newValue:string, type:string} ){
        return await this.authService.customExpenditure(customData.userName, customData.newValue, customData.type)
        }
}
