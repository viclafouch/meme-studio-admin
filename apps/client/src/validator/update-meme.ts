import { z } from 'zod'
import { memeSchema } from '@viclafouch/meme-studio-utilities/schemas'

const metadataSchema = memeSchema
  .pick({ keywords: true, name: true })
  .required()

export const updateMemeSchema = z
  .object({
    en: metadataSchema,
    fr: metadataSchema
  })
  .required()

export type UpdateMemeSchema = z.infer<typeof updateMemeSchema>
export type MemeMetadata = z.infer<typeof metadataSchema>
