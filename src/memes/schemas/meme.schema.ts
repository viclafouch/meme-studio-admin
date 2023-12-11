import { InferSchemaType, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ versionKey: false })
export class Meme {
  id: Types.ObjectId

  @Prop()
  imageUrl: string

  @Prop()
  width: number

  @Prop()
  height: number
}

export const MemeSchema = SchemaFactory.createForClass(Meme)

MemeSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id
  }
})

export type MemeModel = InferSchemaType<typeof MemeSchema>
