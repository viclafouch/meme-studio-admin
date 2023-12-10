import React from 'react'
import { CircularProgress } from '@mui/material'
import MemesList from '../../components/MemesList'
import { useMemes } from '../../hooks/useMemes'

const Memes = () => {
  const { data: memes } = useMemes()

  if (!memes) {
    return <CircularProgress />
  }

  return <MemesList memes={memes} />
}

export default Memes
