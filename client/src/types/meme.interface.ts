import type { MemeModel } from '../../../src/memes/schemas/meme.schema'

export type Meme = MemeModel & {
  id: string
}
