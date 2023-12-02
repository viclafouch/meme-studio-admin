import { z } from 'zod'

export const createMemeSchema = z
  .object({
    filename: z.string(),
    height: z.number(),
    width: z.number(),
    id: z.string(),
    slug: z.string()
  })
  .required()

export type MemeDto = z.infer<typeof createMemeSchema>
