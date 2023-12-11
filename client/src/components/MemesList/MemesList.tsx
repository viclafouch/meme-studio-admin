import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Meme } from '../../types/meme.interface'
import MemesListItem from '../MemesListItem'

export type MemesListProps = {
  memes: Meme[]
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
