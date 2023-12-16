import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { LightMeme } from '@viclafouch/meme-studio-utilities/schemas'
import MemesListItem from '../MemesListItem'

export type MemesListProps = {
  memes: LightMeme[]
}

const MemesList = ({ memes }: MemesListProps) => {
  return (
    <Grid container spacing={2}>
      {memes.map((meme) => {
        return (
          <Grid key={meme.id} xs={3}>
            <MemesListItem meme={meme} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default MemesList
