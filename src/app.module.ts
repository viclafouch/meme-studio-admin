import { LoggerMiddleware } from 'src/logger.middleware'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { MemesModule } from './memes/memes.module'

@Module({
  imports: [MemesModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'memes', method: RequestMethod.GET })
  }
}
