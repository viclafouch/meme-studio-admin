import { NextFunction, Request, Response } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('Request...')
    next()
  }
}
