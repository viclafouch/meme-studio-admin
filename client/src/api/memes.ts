import { Meme } from '../types/meme.interface'
import { requestWithAuth } from './helpers'

export function getAllMemes() {
  return requestWithAuth
    .headers({
      'content-type': 'application/json'
    })
    .get('/memes')
    .json<Meme[]>()
}

export function newMeme({ image }: { image: File }) {
  return requestWithAuth
    .url('/memes/new')
    .formData({ image, width: 100, height: 100, slug: 'test' })
    .post()
    .json<Meme>()
}
