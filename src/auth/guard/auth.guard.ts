import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { userDto } from '../dto/userDetails.dto';

@Injectable()
export class DuplicateUserGuard implements CanActivate {
  constructor(private authService:AuthService){}
async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    let request = context.switchToHttp().getRequest()
    let credential = request.body
    let message = await this.authService.login(credential.userName)
    if(!message) return true
    return false
  }
}
