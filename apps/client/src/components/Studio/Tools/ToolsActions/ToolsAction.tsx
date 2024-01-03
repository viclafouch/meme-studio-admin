import React from 'react'
import { useFormState } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button } from '@mui/material'
import { useTools } from '@viclafouch/meme-studio-utilities/hooks'
import { UpdateMemeSchema } from '../../../../validator/update-meme'

export type ToolsActionsProps = {
  onAddText: () => void
}

const ToolsActions = ({ onAddText }: ToolsActionsProps) => {
  const { addItem } = useTools()
  const { isSubmitting } = useFormState<UpdateMemeSchema>()

  const handleAddTextbox = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addItem()
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
      <LoadingButton
        loading={isSubmitting}
        variant="outlined"
        startIcon={<SaveIcon />}
        type="submit"
      >
        Sauvegarder
      </LoadingButton>
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
