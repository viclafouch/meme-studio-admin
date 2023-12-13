import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import Studio from '../../components/Studio'
import { queries } from '../../config/queries'
import { editMemeRoute } from '../../routes'

const EditMeme = () => {
  const { memeId } = editMemeRoute.useParams()

  const memeQuery = useSuspenseQuery(queries.meme.getOne(memeId))
  const meme = memeQuery.data

  return <Studio meme={meme} />
}

export default EditMeme
