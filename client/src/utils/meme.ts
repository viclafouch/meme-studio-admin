import { LightMeme, Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { getMemeSlug } from '@viclafouch/meme-studio-utilities/utils'
import { memeStudioWebsite } from '../constants/env'

export function getMemeUrl(meme: Meme | LightMeme) {
  return `${memeStudioWebsite}/create/${getMemeSlug(meme)}`
}
