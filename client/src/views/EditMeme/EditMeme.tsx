import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { queries } from '../../config/queries'
import { editMemeRoute } from '../../routes'

const EditMeme = () => {
  const { memeId } = editMemeRoute.useParams()

  const memeQuery = useSuspenseQuery(queries.meme.getOne(memeId))
  const meme = memeQuery.data

  return <div>{meme.imageUrl}</div>
}

export default EditMeme
