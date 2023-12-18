import { InferSchemaType, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  ALIGN_VERTICAL,
  FONTS_FAMILY,
  TEXT_ALIGN
} from '@viclafouch/meme-studio-utilities/constants'

@Schema({
  versionKey: false,
  timestamps: false
})
class TextboxProperties {
  @Prop({ required: true })
  value: string

  @Prop({ required: true })
  width: number

  @Prop({ required: true })
  height: number

  @Prop({ required: true })
  centerX: number

  @Prop({ required: true })
  centerY: number

  @Prop({ required: true })
  isUppercase: boolean

  @Prop({ required: true })
  rotate: number

  @Prop({ required: true, min: 0, max: 100 })
  fontSize: number

  @Prop({ required: true, enum: FONTS_FAMILY })
  fontFamily: string

  @Prop({ required: true, min: 0, max: 100 })
  boxShadow: number

  @Prop({ required: true })
  color: string

  @Prop({ required: true, enum: TEXT_ALIGN })
  textAlign: string

  @Prop({ required: true, enum: ALIGN_VERTICAL })
  alignVertical: string
}

@Schema({ versionKey: false, timestamps: false })
export class TextBox {
  id: Types.ObjectId

  @Prop()
  properties: TextboxProperties
}

export const TextBoxSchema = SchemaFactory.createForClass(TextBox)

TextBoxSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id
  }
})

export type TextBoxModel = InferSchemaType<typeof TextBoxSchema>
