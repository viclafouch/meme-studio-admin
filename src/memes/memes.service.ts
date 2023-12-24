import { randomUUID } from 'crypto'
import { Document, Model, Types } from 'mongoose'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { defaultLocale } from 'src/constants/locale'
import { MemeDto } from 'src/memes/dto/create-meme.dto'
import { UpdateMemeSchema } from 'src/memes/dto/update-meme.dto'
import { Meme } from 'src/memes/schemas/meme.schema'
import { TextBox } from 'src/textboxes/schemas/textbox.schema'
import { Translation } from 'src/translations/schemas/translation.schema'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class MemesService {
  constructor(
    @InjectModel('Meme') private memeModel: Model<Meme>,
    @InjectModel('Textbox') private textboxModel: Model<TextBox>,
    @InjectModel('Translation') private translationModel: Model<Translation>,
    private cloudinary: CloudinaryService
  ) {}

  private getTranslatedMeme(
    meme: Document<unknown, unknown, Meme> &
      Meme & {
        _id: Types.ObjectId
      },
    locale: string
  ) {
    return meme.toJSON({
      transform: (_, ret: Meme) => {
        const translation = meme.translations.find((t) => {
          return t.locale === locale
        })

        if (translation) {
          ret.name = translation.name
        }

        return ret
      }
    })
  }

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

    const populatedMeme = await this.memeModel
      .findById(meme._id)
      .populate('textboxes')
      .populate('translations')
      .exec()

    return populatedMeme!
  }

  async findAll({
    locale = defaultLocale
  }: {
    locale: string
  }): Promise<Meme[]> {
    const memes = await this.memeModel.find().populate('translations').exec()

    return memes.map((meme) => {
      return this.getTranslatedMeme(meme, locale)
    })
  }

  async findOne(
    id: string,
    {
      withTextboxes = false,
      locale = 'en'
    }: { withTextboxes: boolean; locale: string }
  ): Promise<Meme> {
    const meme = await this.getMemeDocById(id)

    if (withTextboxes) {
      await meme.populate('textboxes')
    }

    await meme.populate('translations')

    return this.getTranslatedMeme(meme, locale)
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
    const session = await this.memeModel.startSession()

    session.startTransaction()

    try {
      const meme = await this.getMemeDocById(memeId)

      await this.textboxModel
        .deleteMany({ _id: { $in: meme.textboxes } })
        .session(session)

      await meme.deleteOne().session(session)

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
