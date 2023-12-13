import { queryOptions } from '@tanstack/react-query'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { getOneMeme } from '../../api/memes'

export const getOne = (memeId: Meme['id']) => {
  return queryOptions({
    queryKey: ['posts', { memeId }],
    queryFn: () => {
      return getOneMeme(memeId)
    }
  })
}
