import { randomUUID } from 'crypto'
import { Model, Types } from 'mongoose'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { defaultLocale } from 'src/constants/locale'
import { MemeDto } from 'src/memes/dto/create-meme.dto'
import { UpdateMemeSchema } from 'src/memes/dto/update-meme.dto'
import { Meme } from 'src/memes/schemas/meme.schema'
import { TextBox } from 'src/textboxes/schemas/textbox.schema'
import { Translation } from 'src/translations/schemas/translation.schema'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Locales } from '@viclafouch/meme-studio-utilities/constants'

@Injectable()
export class MemesService {
  constructor(
    @InjectModel('Meme') private memeModel: Model<Meme>,
    @InjectModel('Textbox') private textboxModel: Model<TextBox>,
    @InjectModel('Translation') private translationModel: Model<Translation>,
    private cloudinary: CloudinaryService
  ) {}

  private getTranslatedMeme(meme: Meme, locale: Locales) {
    const translation = meme.translations.find((t) => {
      return t.locale === locale
    })

    if (translation) {
      meme.name = translation.name
      meme.keywords = translation.keywords
    }

    return meme
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
      keywords: [],
      imageUrl: fileData.secure_url,
      imagePublicId: fileData.public_id
    })

    const meme = await createdMeme.save()

    const populatedMeme = await this.memeModel
      .findById(meme._id)
      .populate('textboxes')
      .populate('translations')
      .lean()
      .exec()

    return populatedMeme!
  }

  async findAll({
    locale = defaultLocale
  }: {
    locale: Locales
  }): Promise<Meme[]> {
    const memes = await this.memeModel.find().populate('translations').lean()

    return memes.map((meme) => {
      return this.getTranslatedMeme(meme, locale)
    })
  }

  async findOne(
    id: string,
    { locale = defaultLocale }: { locale: Locales }
  ): Promise<Meme> {
    const meme = await this.getMemeDocById(id)

    await meme.populate('textboxes')
    await meme.populate('translations')

    return this.getTranslatedMeme(meme, locale)
  }

  async updateOne(memeId: string, dto: UpdateMemeSchema): Promise<Meme> {
    const currentMeme = await this.getMemeDocById(memeId)

    const session = await this.memeModel.startSession()
    session.startTransaction()

    try {
      await this.textboxModel.deleteMany({ _id: { $in: currentMeme } })
      await this.translationModel.deleteMany({
        _id: { $in: currentMeme.translations }
      })
      const { textboxes, translations, meme } = dto

      const createdTranslations =
        await this.translationModel.insertMany(translations)

      const createdTextboxes = await this.textboxModel.insertMany(
        textboxes.map((properties) => {
          return { properties }
        })
      )

      const textboxIds: string[] = createdTextboxes.map((textboxDoc) => {
        return textboxDoc.id
      })

      const translationsIds: string[] = createdTranslations.map(
        (translationDoc) => {
          return translationDoc.id
        }
      )
      console.log({
        textboxes: textboxIds,
        translations: translationsIds,
        name: meme.name,
        keywords: meme.keywords
      })

      const updatedMeme = await this.memeModel
        .findByIdAndUpdate(
          memeId,
          {
            textboxes: textboxIds,
            translations: translationsIds,
            name: meme.name,
            keywords: meme.keywords
          },
          { new: true, upsert: true }
        )
        .populate('textboxes')
        .populate('translations')
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
