import { queryOptions } from '@tanstack/react-query'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { getAllMemes, getOneMeme } from '../../api/memes'

export const getOne = (memeId: Meme['id']) => {
  return queryOptions({
    queryKey: ['posts', { memeId }],
    queryFn: () => {
      return getOneMeme(memeId)
    }
  })
}

export const getAll = () => {
  return queryOptions({
    queryKey: ['posts'],
    queryFn: () => {
      return getAllMemes()
    }
  })
}
