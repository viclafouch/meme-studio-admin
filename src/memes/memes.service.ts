import { Model } from 'mongoose'
import { MemeDto } from 'src/memes/dto/create-meme.dto'
import { Meme } from 'src/schemas/meme.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class MemesService {
  constructor(@InjectModel(Meme.name) private memeModel: Model<Meme>) {}

  async create(dto: MemeDto): Promise<Meme> {
    const createdCat = new this.memeModel(dto)

    return createdCat.save()
  }

  async findAll(): Promise<Meme[]> {
    return this.memeModel.find().exec()
  }
}
