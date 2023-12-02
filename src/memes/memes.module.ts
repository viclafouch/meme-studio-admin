import { Module } from '@nestjs/common'
import { MemesController } from './memes.controller'
import { MemesService } from './memes.service'

@Module({
  controllers: [MemesController],
  providers: [MemesService]
})
export class MemesModule {}
