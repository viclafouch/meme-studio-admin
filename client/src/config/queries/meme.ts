import { queryOptions } from '@tanstack/react-query'
import { getOneMeme } from '../../api/memes'
import { Meme } from '../../types/meme.interface'

export const getOne = (memeId: Meme['id']) => {
  return queryOptions({
    queryKey: ['posts', { memeId }],
    queryFn: () => {
      return getOneMeme(memeId)
    }
  })
}
