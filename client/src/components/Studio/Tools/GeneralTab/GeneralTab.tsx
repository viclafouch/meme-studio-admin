import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip
} from '@mui/material'
import { useClipboard } from '@viclafouch/meme-studio-utilities/hooks'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { getMemeSlug } from '@viclafouch/meme-studio-utilities/utils'

export type GeneralTabProps = {
  meme: Meme
}

const GeneralTab = ({ meme }: GeneralTabProps) => {
  const { copy } = useClipboard()

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    copy(new Blob([meme.imagePublicId], { type: 'text/plain' }))
  }

  return (
    <Stack component="form" mt={2} direction="column" gap={2}>
      <TextField
        helperText={`Le slug est : ${getMemeSlug(meme)}`}
        value={meme.name}
        label="Nom"
        fullWidth
        size="small"
      />
      <TextField
        value={meme.imageUrl}
        label="Image URL"
        fullWidth
        variant="filled"
        size="small"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                LinkComponent="a"
                href={meme.imageUrl}
                target="_blank"
                color="info"
                aria-label="Ouvrir le lien de l'image"
              >
                <Tooltip title="Ouvrir le lien" placement="top">
                  <OpenInNewIcon fontSize="small" />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Stack direction="row" gap={2}>
        <TextField
          value={meme.width}
          label="Largeur"
          fullWidth
          variant="filled"
          size="small"
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">px</InputAdornment>
          }}
        />
        <TextField
          value={meme.height}
          label="Hauteur"
          fullWidth
          variant="filled"
          size="small"
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">px</InputAdornment>
          }}
        />
      </Stack>
      <TextField
        value={meme.imagePublicId}
        label="Cloudinary ID"
        fullWidth
        variant="filled"
        size="small"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCopy} color="info" aria-label="Copier">
                <Tooltip title="Copier" placement="top">
                  <ContentCopyIcon fontSize="small" />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Stack>
  )
}

export default GeneralTab
