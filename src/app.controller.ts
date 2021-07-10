import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AutehticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ApiAcceptedResponse, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse} from '@nestjs/swagger'
import * as CryptoJS from 'crypto-js';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({description: 'User Login - Provide Username Password as JSON'})
  @ApiOkResponse({description: 'User Login - Provide Username Password as JSON'})
  @ApiUnauthorizedResponse({description: 'Invalid Credentials'})
  login(@Body() body): any {
    const encryptData = body.username
    console.log(process.env.JWT_SECRET)
    var token = CryptoJS.AES.encrypt(
      String(encryptData),
      String(process.env.JWT_SECRET)
    ).toString()
    return  token
  }

  @UseGuards(AutehticatedGuard)
  @ApiCreatedResponse({description: 'Token Based Authentication - Provide Token as JSON in Request Body'})
  @ApiOkResponse({description: 'Token Based Authtication - Provide as JSON in Request Body'})
  @Post('protected')
  getHello(@Request() req, @Response() res): any{
    return res.json({"Authenticated": "true"})
  }
}
