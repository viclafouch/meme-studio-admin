import React from 'react'
import { useSnackbar } from 'notistack'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  useRatiotedTextboxes,
  useTools
} from '@viclafouch/meme-studio-utilities/hooks'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { updateMeme } from '../../../../api/memes'
import { queries } from '../../../../config/queries'

export type ToolsActionsProps = {
  onAddText: () => void
  meme: Meme
}

const ToolsActions = ({ onAddText, meme }: ToolsActionsProps) => {
  const { addItem } = useTools()
  const ratiotedTextboxes = useRatiotedTextboxes()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const updateMemeMutation = useMutation({
    mutationFn: () => {
      return updateMeme(meme.id, {
        meme,
        textboxes: ratiotedTextboxes().map((textbox) => {
          return {
            ...textbox.properties,
            value: ''
          }
        })
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queries.meme.getOne(meme.id).queryKey
      })
      enqueueSnackbar('Mise à jour effectuée', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Une erreur inconnue est survenue', { variant: 'error' })
    }
  })

  const handleAddTextbox = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addItem()
    onAddText?.()
  }

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (updateMemeMutation.isPending) {
      return
    }

    updateMemeMutation.mutate()
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
        loading={updateMemeMutation.isPending}
        variant="outlined"
        startIcon={<SaveIcon />}
        type="button"
        onClick={handleSave}
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
