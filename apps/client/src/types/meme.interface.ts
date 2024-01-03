import type { MemeModel } from '../../../src/memes/schemas/meme.schema'

export type Meme = Omit<MemeModel, 'id'> & {
  id: string
}
