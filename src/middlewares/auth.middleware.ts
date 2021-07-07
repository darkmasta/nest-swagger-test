import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express-serve-static-core";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Logging request IP', req.ip);
    if (req.headers.authorization !== '123456') {
      res.status(500).end({status: "Authorization needed"})
    } else {
      next()
    }
  }
}