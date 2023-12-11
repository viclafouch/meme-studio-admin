import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { MemesService } from './memes.service'

@Controller('memes')
export class MemesController {
  constructor(private memesService: MemesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.memesService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.memesService.findOne(id)
  }
}
