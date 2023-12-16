import { Meme, memeSchema } from '@viclafouch/meme-studio-utilities/schemas'
import type { UpdateMemeDto } from './../../../src/memes/dto/update-meme.dto'
import { requestWithAuth } from './helpers'

export function getAllMemes() {
  return requestWithAuth
    .headers({
      'content-type': 'application/json'
    })
    .get('/memes')
    .json<Meme[]>()
}

export function getOneMeme(id: Meme['id']) {
  return requestWithAuth
    .headers({
      'content-type': 'application/json'
    })
    .get(`/memes/${id}`)
    .json<Meme>(memeSchema.parse)
}

export function newMeme({ image }: { image: File }) {
  return requestWithAuth
    .url('/memes/new')
    .formData({ image, width: 100, height: 100, slug: 'test' })
    .post()
    .json<Meme>(memeSchema.parse)
}

export function updateMeme(memeId: Meme['id'], body: UpdateMemeDto) {
  return requestWithAuth
    .url(`/memes/update/${memeId}`)
    .put(body)
    .json<Meme>(memeSchema.parse)
}
