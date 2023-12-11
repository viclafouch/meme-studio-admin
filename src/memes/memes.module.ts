import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { Meme, MemeSchema } from 'src/memes/schemas/meme.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MemesController } from './memes.controller'
import { MemesService } from './memes.service'

@Module({
  controllers: [MemesController],
  providers: [MemesService, CloudinaryService],
  imports: [
    MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }])
  ]
})
export class MemesModule {}
