import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { useSuspenseQuery } from '@tanstack/react-query'
import DeleteMeme from '../../components/DeleteMeme'
import Studio from '../../components/Studio'
import { queries } from '../../config/queries'
import { editMemeRoute } from '../../routes'
import { getMemeUrl } from '../../utils/meme'

const EditMeme = () => {
  const { memeId } = editMemeRoute.useParams()

  const memeQuery = useSuspenseQuery(queries.meme.getOne(memeId))
  const meme = memeQuery.data

  return (
    <Stack direction="column" gap={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1">
          {meme.name}{' '}
          <Tooltip title="Créer sur meme-studo.io" placement="top">
            <IconButton
              LinkComponent="a"
              href={getMemeUrl(meme)}
              size="small"
              target="_blank"
              color="info"
              aria-label="Créer sur meme-studo.io"
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>
        <Box>
          <DeleteMeme memeId={meme.id} />
        </Box>
      </Stack>
      <Studio meme={meme} />
    </Stack>
  )
}

export default EditMeme
