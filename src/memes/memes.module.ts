import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { MemeSchema } from 'src/memes/schemas/meme.schema'
import { TextBoxSchema } from 'src/textboxes/schemas/textbox.schema'
import { TranslationSchema } from 'src/translations/schemas/translation.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MemesController } from './memes.controller'
import { MemesService } from './memes.service'

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
