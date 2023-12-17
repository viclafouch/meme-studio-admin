import { InferSchemaType, Types } from 'mongoose'
import * as mongoose from 'mongoose'
import { TextBox } from 'src/textboxes/schemas/textbox.schema'
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

  @Prop()
  imageUrl: string

  @Prop()
  imagePublicId: string

  @Prop()
  name: string

  @Prop()
  width: number

  @Prop()
  height: number

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Textbox' }])
  textboxes: TextBox[]
}

export const MemeSchema = SchemaFactory.createForClass(Meme)

MemeSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id
  }
})

export type MemeModel = InferSchemaType<typeof MemeSchema>
