import { LightMeme, Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { getMemeSlug } from '@viclafouch/meme-studio-utilities/utils'

export function getMemeUrl(meme: Meme | LightMeme) {
  return `https://www.meme-studio.io/create/${getMemeSlug(meme)}`
}
