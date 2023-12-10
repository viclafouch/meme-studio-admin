import { join } from 'path'
import { jwtConstants } from 'src/constants/jwt'
import { LoggerMiddleware } from 'src/logger.middleware'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { MemesModule } from './memes/memes.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    MemesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
      exclude: ['/api/(.*)'],
      serveRoot: '/'
    }),
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' }
    }),
    ConfigModule.forRoot({ cache: true }),
    MongooseModule.forRoot(
      'mongodb+srv://viclafouch:OtS2DuNbbx7PKg5E@cluster0.e095fov.mongodb.net/?retryWrites=true&w=majority'
    )
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'memes', method: RequestMethod.GET })
  }
}
