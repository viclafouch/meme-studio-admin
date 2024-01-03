import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(email)

    if (user?.password !== password) {
      throw new UnauthorizedException()
    }

    const payload = {
      sub: user.userId,
      username: user.username
    }

    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }
}
