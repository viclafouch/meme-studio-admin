import { NestjsFormDataModule } from 'nestjs-form-data'
import { ZodValidationPipe } from 'nestjs-zod'
import { join } from 'path'
import { jwtConstants } from 'src/constants/jwt'
import { LoggerMiddleware } from 'src/logger.middleware'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { MemesModule } from './memes/memes.module'
import { TextboxesModule } from './textboxes/textboxes.module'
import { TranslationsModule } from './translations/translations.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    MemesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
      exclude: ['/api/(.*)']
    }),
    AuthModule,
    UsersModule,
    NestjsFormDataModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' }
    }),
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGO_DB_URI')
        }
      }
    }),
    CloudinaryModule,
    TextboxesModule,
    TranslationsModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'memes/*', method: RequestMethod.ALL })
  }
}
