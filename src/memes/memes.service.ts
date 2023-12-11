import { Model } from 'mongoose'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { MemeDto } from 'src/memes/dto/create-meme.dto'
import { Meme } from 'src/memes/schemas/meme.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class MemesService {
  constructor(
    @InjectModel(Meme.name) private memeModel: Model<Meme>,
    private cloudinary: CloudinaryService
  ) {}

  async create(dto: MemeDto): Promise<Meme> {
    // const fileData = await this.cloudinary.uploadImage(dto.image)

    const createdMeme = new this.memeModel({
      height: dto.height,
      width: dto.width,
      imageUrl: ''
    })

    const meme = await createdMeme.save()

    return meme.toJSON()
  }

  async findAll(): Promise<Meme[]> {
    return this.memeModel.find().exec()
  }
}
