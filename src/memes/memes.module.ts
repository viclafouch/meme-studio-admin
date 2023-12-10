import { Meme, MemeSchema } from 'src/schemas/meme.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MemesController } from './memes.controller'
import { MemesService } from './memes.service'

@Module({
  controllers: [MemesController],
  providers: [MemesService],
  imports: [
    MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }])
  ]
})
export class MemesModule {}
