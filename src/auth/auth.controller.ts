import { ZodValidationPipe } from 'src/pipes/zod'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto, signInSchema } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(signInSchema))
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }
}
