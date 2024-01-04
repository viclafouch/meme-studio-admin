import { NestjsFormDataModule } from 'nestjs-form-data'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { MemesService } from '../memes/memes.service'
import { MemeSchema } from '../memes/schemas/meme.schema'
import { TextBoxSchema } from '../textboxes/schemas/textbox.schema'
import { TranslationSchema } from '../translations/schemas/translation.schema'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UsersModule,
    NestjsFormDataModule,
    MongooseModule.forFeature([
      { name: 'Meme', schema: MemeSchema },
      { name: 'Textbox', schema: TextBoxSchema },
      { name: 'Translation', schema: TranslationSchema }
    ])
  ],
  providers: [AuthService, MemesService, CloudinaryService],
  controllers: [AuthController]
})
export class AuthModule {}
