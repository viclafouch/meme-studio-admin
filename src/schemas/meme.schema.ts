import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Meme {
  @Prop()
  filename: string

  @Prop()
  width: number

  @Prop()
  height: number
}

export const MemeSchema = SchemaFactory.createForClass(Meme)
