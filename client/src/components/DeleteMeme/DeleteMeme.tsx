import React from 'react'
import { useSnackbar } from 'notistack'
import DeleteIcon from '@mui/icons-material/Delete'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { deleteMeme } from '../../api/memes'
import { queries } from '../../config/queries'

export type DeleteMemeProps = {
  memeId: Meme['id']
}

const DeleteMeme = ({ memeId }: DeleteMemeProps) => {
  const [isDialogOpened, setIsDialogOpened] = React.useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const deleteMemeMutation = useMutation({
    mutationFn: async () => {
      return deleteMeme(memeId)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queries.meme.getAll().queryKey,
        exact: true
      })
      await navigate({
        to: '/memes',
        replace: true
      })
    },
    onError: () => {
      enqueueSnackbar('Une erreur inconnue est survenue', { variant: 'error' })
    }
  })

  const handleOpenDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsDialogOpened(true)
  }

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsDialogOpened(false)
  }

  const handleConfirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (deleteMemeMutation.isPending) {
      return
    }

    deleteMemeMutation.mutate()
  }

  return (
    <>
      <LoadingButton
        startIcon={<DeleteIcon />}
        color="error"
        type="button"
        variant="contained"
        onClick={handleOpenDialog}
      >
        Supprimer le meme
      </LoadingButton>
      <Dialog
        open={isDialogOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Supprimer le meme ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer le meme et ses zones de textes ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <LoadingButton
            loading={deleteMemeMutation.isPending}
            onClick={handleConfirmDelete}
          >
            Confirmer
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteMeme
