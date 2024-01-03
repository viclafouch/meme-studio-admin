import { Module } from '@nestjs/common'
import { TranslationsController } from './translations.controller'

@Module({
  controllers: [TranslationsController]
})
export class TranslationsModule {}
