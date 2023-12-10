import { Request } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'
import { MemesService } from 'src/memes/memes.service'
import { ZodValidationPipe } from 'src/pipes/zod'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto, signInSchema } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private memesService: MemesService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(signInSchema))
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('memes')
  getMemes() {
    return this.memesService.findAll()
  }
}
