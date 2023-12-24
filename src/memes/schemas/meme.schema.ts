import { InferSchemaType, Types } from 'mongoose'
import * as mongoose from 'mongoose'
import { TextBox } from 'src/textboxes/schemas/textbox.schema'
import { Translation } from 'src/translations/schemas/translation.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  }
})
export class Meme {
  id: Types.ObjectId

  @Prop({ required: true })
  imageUrl: string

  @Prop({ required: true })
  imagePublicId: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  width: number

  @Prop({ required: true })
  height: number

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Textbox' }])
  textboxes: TextBox[]

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Translation' }])
  translations: Translation[]
}

export const MemeSchema = SchemaFactory.createForClass(Meme)

MemeSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id
  }
})

export type MemeModel = InferSchemaType<typeof MemeSchema>
