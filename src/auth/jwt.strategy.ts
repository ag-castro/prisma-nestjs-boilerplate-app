import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { User } from '../../generated/prisma-client'

const cookieExtractor = (req: Request): string | null => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.token
  }
  return token
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      secret: process.env.JWT_SECRET,
    })
  }

  validate(payload): Promise<User> {
    return this.authService.validate(payload)
  }
}