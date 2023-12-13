import * as cookieParser from 'cookie-parser'
import { json } from 'express'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.use(json({ limit: '10mb' }))
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
