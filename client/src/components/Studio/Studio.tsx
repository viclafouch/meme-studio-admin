import React from 'react'
import { Box } from '@mui/material'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { EditorProvider } from '@viclafouch/meme-studio-utilities/stores'
import Canvas from './Canvas'
import FormWrapper from './FormWrapper'
import Tools from './Tools'

export type StudioProps = {
  meme: Meme
}

const Studio = ({ meme }: StudioProps) => {
  return (
    <EditorProvider key={meme.id} textBoxes={meme.textboxes} meme={meme}>
      <FormWrapper meme={meme}>
        <Box
          display="grid"
          height="100%"
          gap="5%"
          gridTemplateColumns="40% auto"
          alignItems="flex-start"
          flex={1}
        >
          <Tools />
          <Canvas />
        </Box>
      </FormWrapper>
    </EditorProvider>
  )
}

export default Studio
