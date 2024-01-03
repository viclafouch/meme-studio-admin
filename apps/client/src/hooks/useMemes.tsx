import { useQuery } from '@tanstack/react-query'
import { queries } from '../config/queries'

export function useMemes() {
  return useQuery(queries.meme.getAll())
}
