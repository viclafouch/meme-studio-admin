import { NestjsFormDataModule } from 'nestjs-form-data'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { MemesService } from 'src/memes/memes.service'
import { MemeSchema } from 'src/memes/schemas/meme.schema'
import { TextBoxSchema } from 'src/textboxes/schemas/textbox.schema'
import { TranslationSchema } from 'src/translations/schemas/translation.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
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
