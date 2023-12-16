import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import {
  memeSchema,
  textboxPropertiesSchema
} from '@viclafouch/meme-studio-utilities/schemas'

export const updateMemeSchema = z
  .object({
    meme: memeSchema.omit({ textboxes: true }),
    textboxes: z.array(textboxPropertiesSchema)
  })
  .required()

export class UpdateMemeDto extends createZodDto(updateMemeSchema) {}

export type UpdateMemeSchema = z.infer<typeof updateMemeSchema>
