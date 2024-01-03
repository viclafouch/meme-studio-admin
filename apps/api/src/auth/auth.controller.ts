import { FormDataRequest } from 'nestjs-form-data'
import { AuthGuard } from 'src/auth/auth.guard'
import { defaultLocale } from 'src/constants/locale'
import { MemeDto } from 'src/memes/dto/create-meme.dto'
import { UpdateMemeDto } from 'src/memes/dto/update-meme.dto'
import { MemesService } from 'src/memes/memes.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private memesService: MemesService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('memes')
  getMemes() {
    return this.memesService.findAll({ locale: defaultLocale })
  }

  @UseGuards(AuthGuard)
  @Get('memes/:id')
  @HttpCode(HttpStatus.OK)
  getMeme(@Param('id') id: string) {
    return this.memesService.findOne(id, { locale: defaultLocale })
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('memes/new')
  @FormDataRequest()
  async postMeme(@Body() body: MemeDto) {
    return this.memesService.create(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('memes/update/:id')
  async updateMeme(@Param('id') id: string, @Body() body: UpdateMemeDto) {
    return this.memesService.updateOne(id, body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('memes/delete/:id')
  async deleteMeme(@Param('id') id: string) {
    return this.memesService.deleteOne(id)
  }
}
