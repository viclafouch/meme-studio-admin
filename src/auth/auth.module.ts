import { MemesService } from 'src/memes/memes.service'
import { Meme, MemeSchema } from 'src/schemas/meme.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }])
  ],
  providers: [AuthService, MemesService],
  controllers: [AuthController]
})
export class AuthModule {}
