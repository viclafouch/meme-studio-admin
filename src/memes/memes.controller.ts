import { AuthGuard } from 'src/auth/auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common'
import { createMemeSchema, MemeDto } from './dto/create-meme.dto'
import { MemesService } from './memes.service'

@Controller('memes')
export class MemesController {
  constructor(private memesService: MemesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.memesService.findAll()
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createMemeSchema))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMemeDto: MemeDto) {
    return this.memesService.create(createMemeDto)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return id
  }
}
