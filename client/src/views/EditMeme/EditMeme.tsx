import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useSuspenseQuery } from '@tanstack/react-query'
import DeleteMeme from '../../components/DeleteMeme'
import Studio from '../../components/Studio'
import { queries } from '../../config/queries'
import { editMemeRoute } from '../../routes'

const EditMeme = () => {
  const { memeId } = editMemeRoute.useParams()

  const memeQuery = useSuspenseQuery(queries.meme.getOne(memeId))
  const meme = memeQuery.data

  return (
    <Stack direction="column" flex={1} gap={3}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h2">Test</Typography>
        </Box>
        <Box>
          <DeleteMeme memeId={meme.id} />
        </Box>
      </Stack>
      <Studio meme={meme} />
    </Stack>
  )
}

export default EditMeme
