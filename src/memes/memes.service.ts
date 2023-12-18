import { randomUUID } from 'crypto'
import { Model, Types } from 'mongoose'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { MemeDto } from 'src/memes/dto/create-meme.dto'
import { UpdateMemeSchema } from 'src/memes/dto/update-meme.dto'
import { Meme } from 'src/memes/schemas/meme.schema'
import { TextBox } from 'src/textboxes/schemas/textbox.schema'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class MemesService {
  constructor(
    @InjectModel('Meme') private memeModel: Model<Meme>,
    @InjectModel('Textbox') private textboxModel: Model<TextBox>,
    private cloudinary: CloudinaryService
  ) {}

  private async getMemeDocById(memeId: string) {
    const validObjectId = Types.ObjectId.isValid(memeId)

    if (!validObjectId) {
      throw new NotFoundException()
    }

    const meme = await this.memeModel.findById(memeId)

    if (!meme) {
      throw new NotFoundException()
    }

    return meme
  }

  async create(dto: MemeDto): Promise<Meme> {
    const fileId = randomUUID()

    const fileData = await this.cloudinary.uploadImage(dto.image, {
      folder: 'memes',
      tags: '',
      public_id: fileId,
      allowed_formats: ['jpg', 'png'],
      transformation: [
        {
          width: 1000,
          format: 'webp'
        }
      ]
    })

    const createdMeme = new this.memeModel({
      height: dto.height,
      width: dto.width,
      name: dto.name,
      imageUrl: fileData.secure_url,
      imagePublicId: fileData.public_id
    })

    const meme = await createdMeme.save()

    return meme.populate('textboxes')
  }

  async findAll(): Promise<Meme[]> {
    return this.memeModel.find().exec()
  }

  async findOne(
    id: string,
    { withTextboxes = false }: { withTextboxes: boolean }
  ): Promise<Meme> {
    const meme = await this.getMemeDocById(id)

    if (withTextboxes) {
      return meme.populate('textboxes')
    }

    return meme
  }

  async updateOne(memeId: string, dto: UpdateMemeSchema): Promise<Meme> {
    const meme = await this.getMemeDocById(memeId)

    const session = await this.memeModel.startSession()
    session.startTransaction()

    try {
      await this.textboxModel.deleteMany({ _id: { $in: meme.textboxes } })
      const { textboxes } = dto

      const createdTextboxes = await this.textboxModel.insertMany(
        textboxes.map((properties) => {
          return {
            properties
          }
        })
      )

      const textboxIds: string[] = createdTextboxes.map((textboxDoc) => {
        return textboxDoc.id
      })

      const updatedMeme = await this.memeModel
        .findByIdAndUpdate(
          memeId,
          { textboxes: textboxIds },
          { new: true, upsert: true }
        )
        .populate('textboxes')
        .session(session)

      await session.commitTransaction()
      session.endSession()

      return updatedMeme
    } catch (error) {
      await session.abortTransaction()

      session.endSession()

      throw error
    }
  }

  async deleteOne(memeId: string): Promise<void> {
    const meme = await this.getMemeDocById(memeId)

    const session = await this.memeModel.startSession()
    session.startTransaction()

    try {
      await this.textboxModel
        .deleteMany({ _id: { $in: meme.textboxes } })
        .session(session)

      await this.memeModel.findOneAndDelete(meme.id).session(session)

      const { result } = await this.cloudinary.removeFile(meme.imagePublicId)

      if (result !== 'ok') {
        throw new Error(result)
      }

      await session.commitTransaction()
      await session.endSession()
    } catch (error) {
      await session.abortTransaction()
      await session.endSession()

      throw error
    }
  }
}
