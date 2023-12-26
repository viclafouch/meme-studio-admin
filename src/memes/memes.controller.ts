import { defaultLocale } from 'src/constants/locale'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query
} from '@nestjs/common'
import { MemesService } from './memes.service'

@Controller('memes')
export class MemesController {
  constructor(private memesService: MemesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('locale') locale = defaultLocale) {
    return this.memesService.findAll({ locale })
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string, @Query('locale') locale = defaultLocale) {
    return this.memesService.findOne(id, { locale })
  }
}
