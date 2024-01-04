import { z } from 'zod'
import {
  CreateMeme,
  LightMeme,
  lightMemeSchema,
  Meme,
  memeSchema
} from '@viclafouch/meme-studio-utilities/schemas'
import { requestWithAuth } from './helpers'

export function getAllMemes() {
  return requestWithAuth
    .headers({
      'content-type': 'application/json'
    })
    .get('/memes')
    .json<LightMeme[]>(z.array(lightMemeSchema).parse)
}

export function getOneMeme(id: Meme['id']) {
  return requestWithAuth
    .headers({
      'content-type': 'application/json'
    })
    .get(`/memes/${id}`)
    .json<Meme>(memeSchema.parse)
}

export function newMeme(body: CreateMeme) {
  return requestWithAuth
    .url('/memes/new')
    .formData(body)
    .post()
    .json<Meme>(memeSchema.parse)
}

// TODO: remove any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateMeme(memeId: Meme['id'], body: any) {
  return requestWithAuth
    .url(`/memes/update/${memeId}`)
    .put(body)
    .json<Meme>(memeSchema.parse)
}

export async function deleteMeme(memeId: Meme['id']) {
  return requestWithAuth.url(`/memes/delete/${memeId}`).delete().res()
}
