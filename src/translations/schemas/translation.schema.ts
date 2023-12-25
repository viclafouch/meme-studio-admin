import { InferSchemaType, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ versionKey: false, timestamps: false })
export class Translation {
  id: Types.ObjectId

  @Prop({ required: true })
  locale: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  keywords: string[]
}

export const TranslationSchema = SchemaFactory.createForClass(Translation)

TranslationSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id
  }
})

export type TextBoxModel = InferSchemaType<typeof TranslationSchema>
