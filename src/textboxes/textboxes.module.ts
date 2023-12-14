import { Module } from '@nestjs/common'
import { TextboxesController } from './textboxes.controller'

@Module({
  controllers: [TextboxesController],
  providers: []
})
export class TextboxesModule {}
