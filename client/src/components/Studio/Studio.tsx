import React from 'react'
import { Box } from '@mui/material'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { EditorProvider } from '@viclafouch/meme-studio-utilities/stores'
import Canvas from './Canvas'
import Tools from './Tools'

export type StudioProps = {
  meme: Meme
}

const Studio = ({ meme }: StudioProps) => {
  return (
    <EditorProvider key={meme?.id} textBoxes={[]} meme={meme}>
      <Box display="grid" height="100%" gridTemplateColumns="40% auto" flex={1}>
        <Tools />
        <Canvas />
      </Box>
    </EditorProvider>
  )
}

export default Studio
