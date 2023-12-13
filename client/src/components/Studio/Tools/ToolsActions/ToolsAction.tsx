import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import { Box, Button } from '@mui/material'
import { useTools } from '@viclafouch/meme-studio-utilities/hooks'

export type ToolsActionsProps = {
  onAddText: () => void
}

const ToolsActions = ({ onAddText }: ToolsActionsProps) => {
  const { addTextbox } = useTools()

  const handleAddTextbox = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addTextbox()
    onAddText?.()
  }

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      p={2}
      flexShrink={0}
      gap={2}
    >
      <Button variant="outlined" startIcon={<SaveIcon />} type="button">
        Sauvegarder
      </Button>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        type="button"
        onClick={handleAddTextbox}
      >
        Ajouter un texte
      </Button>
    </Box>
  )
}

export default ToolsActions
