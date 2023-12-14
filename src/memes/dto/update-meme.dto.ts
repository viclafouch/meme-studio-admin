import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import {
  memeSchema,
  textboxPropertiesSchema
} from '@viclafouch/meme-studio-utilities/schemas'

const textboxes = z.array(textboxPropertiesSchema)

export const updateMemeSchema = z
  .object({
    meme: memeSchema,
    textboxes
  })
  .required()

export class UpdateMemeDto extends createZodDto(updateMemeSchema) {}

export type UpdateMemeSchema = z.infer<typeof updateMemeSchema>
