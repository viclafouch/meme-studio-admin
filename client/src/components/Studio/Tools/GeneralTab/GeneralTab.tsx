import React from 'react'
import { Stack, TextField } from '@mui/material'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'

export type GeneralTabProps = {
  meme: Meme
}

const GeneralTab = ({ meme }: GeneralTabProps) => {
  return (
    <Stack component="form" mt={2} direction="column" gap={2}>
      <TextField label="Nom" fullWidth size="small" />
      <TextField
        value={meme.imageUrl}
        label="Image URL"
        fullWidth
        variant="filled"
        size="small"
        InputProps={{ readOnly: true }}
      />
      <Stack direction="row" gap={2}>
        <TextField
          value={meme.width}
          label="Largeur"
          fullWidth
          variant="filled"
          size="small"
          InputProps={{ readOnly: true }}
        />
        <TextField
          value={meme.height}
          label="Hauteur"
          fullWidth
          variant="filled"
          size="small"
          InputProps={{ readOnly: true }}
        />
      </Stack>
      <TextField
        value={meme.imagePublicId}
        label="Cloudinary ID"
        fullWidth
        variant="filled"
        size="small"
        InputProps={{ readOnly: true }}
      />
    </Stack>
  )
}

export default GeneralTab
