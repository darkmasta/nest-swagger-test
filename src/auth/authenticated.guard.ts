import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as CryptoJS from 'crypto-js';
import { UsersService } from 'src/users/users.service';



@Injectable()
export class AutehticatedGuard implements CanActivate{
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    console.log(request.body); 
    const token = request.body.token
    if (! request.body.token )  // do we have a token
      return false;
    else if (request.body.token) {
      var cookieData = CryptoJS.AES.decrypt(
        request.body.token,
        String(process.env.JWT_SECRET)
      ).toString(CryptoJS.enc.Utf8);
      const user = await this.usersService.findOne(cookieData) // is token valid?
      console.log(user)
      if (user.password) // if we find the user from provided token
      return true
    } else {
      return false
    }
  }
}