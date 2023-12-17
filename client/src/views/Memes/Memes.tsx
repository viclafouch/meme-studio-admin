import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import { Link } from '@tanstack/react-router'
import MemesList from '../../components/MemesList'
import { useMemes } from '../../hooks/useMemes'

const Memes = () => {
  const { data: memes } = useMemes()

  return (
    <>
      {/* @ts-expect-error */}
      <Fab
        LinkComponent={Link}
        to="/memes/new"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
        aria-label="Ajouter un meme"
        color="primary"
      >
        <AddIcon />
      </Fab>
      {memes ? (
        <MemesList memes={memes} />
      ) : (
        <MemesList loading skeletonCount={12} />
      )}
    </>
  )
}

export default Memes
