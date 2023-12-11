import { FormDataRequest } from 'nestjs-form-data'
import { AuthGuard } from 'src/auth/auth.guard'
import { MemeDto } from 'src/memes/dto/create-meme.dto'
import { MemesService } from 'src/memes/memes.service'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
    return this.memesService.findAll()
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  @Post('memes/new')
  @FormDataRequest()
  async postMeme(@Body() body: MemeDto) {
    return this.memesService.create(body)
  }
}
