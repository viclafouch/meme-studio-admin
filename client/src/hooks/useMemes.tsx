import { useQuery } from '@tanstack/react-query'
import { getAllMemes } from '../api/memes'

export function useMemes() {
  return useQuery({
    queryKey: ['memes'],
    queryFn: () => {
      return getAllMemes()
    }
  })
}
