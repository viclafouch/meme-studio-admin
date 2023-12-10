import { Meme } from './../../../shared/meme.interface'
import { requestWithAuth } from './helpers'

export function getAllMemes() {
  return requestWithAuth.get('/memes').json<Meme[]>()
}
