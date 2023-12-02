import { Injectable } from '@nestjs/common'
import { Meme } from './interfaces/meme.interface'

@Injectable()
export class MemesService {
  private readonly memes: Meme[] = []

  create(meme: Meme) {
    this.memes.push(meme)
  }

  findAll(): Meme[] {
    return this.memes
  }
}
