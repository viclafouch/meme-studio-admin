import { join } from 'path'
import { LoggerMiddleware } from 'src/logger.middleware'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MemesModule } from './memes/memes.module'

@Module({
  imports: [
    MemesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
      exclude: ['/api/(.*)']
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'memes', method: RequestMethod.GET })
  }
}
