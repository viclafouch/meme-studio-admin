import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { TextBoxSchema } from '../textboxes/schemas/textbox.schema'
import { TranslationSchema } from '../translations/schemas/translation.schema'
import { MemesController } from './memes.controller'
import { MemesService } from './memes.service'
import { MemeSchema } from './schemas/meme.schema'

@Module({
  controllers: [MemesController],
  providers: [MemesService, CloudinaryService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Meme', schema: MemeSchema },
      { name: 'Textbox', schema: TextBoxSchema },
      { name: 'Translation', schema: TranslationSchema }
    ])
  ]
})
export class MemesModule {}
