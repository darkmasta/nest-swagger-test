import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express-serve-static-core";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Logging request IP', req.ip);
    if (req.headers.authorization !== 'Bearer 123456') {
      console.log(req.headers.authorization);
      res.status(500).end()
    } else {
      next()
    }
  }
}