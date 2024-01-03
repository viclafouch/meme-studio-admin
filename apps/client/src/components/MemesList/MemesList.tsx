import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { LightMeme } from '@viclafouch/meme-studio-utilities/schemas'
import { getFilledArray } from '../../helpers/array'
import MemesListItem from '../MemesListItem'

type LoadingProps = {
  loading: true
  memes?: never
  skeletonCount?: number
}

type MemesProps = {
  loading?: never
  skeletonCount?: never
  memes: LightMeme[]
}

export type MemesListProps = LoadingProps | MemesProps

const MemesList = ({ memes, skeletonCount = 5 }: MemesListProps) => {
  return (
    <Grid container spacing={2}>
      {memes
        ? memes.map((meme) => {
            return (
              <Grid key={meme.id} xs={12} sm={4} md={3}>
                <MemesListItem meme={meme} />
              </Grid>
            )
          })
        : getFilledArray(skeletonCount).map((id) => {
            return (
              <Grid key={id} xs={12} sm={4} md={3}>
                <MemesListItem loading />
              </Grid>
            )
          })}
    </Grid>
  )
}

export default MemesList
