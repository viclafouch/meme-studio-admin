import React from 'react'
import { useSnackbar } from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { CreateMeme, Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { getMemeSlug } from '@viclafouch/meme-studio-utilities/utils'
import { newMeme } from '../../api/memes'
import { queries } from '../../config/queries'
import { FileExtensions } from '../../constants/file'
import DropZone from '../DropZone'
import { ImgStyled } from './NewMemeForm.styled'

type Dimension = { width: number; height: number }

const NewMemeForm = () => {
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [imgNaturalDimensions, setImgNaturalDimensions] =
    React.useState<Dimension | null>(null)

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [nameValue, setNameValue] = React.useState<string>('')
  const { enqueueSnackbar } = useSnackbar()

  const imageUrl = React.useMemo(() => {
    return imageFile ? URL.createObjectURL(imageFile) : ''
  }, [imageFile])

  const newMemeMutation = useMutation({
    mutationFn: (body: CreateMeme) => {
      return newMeme(body)
    },
    onSuccess: (meme: Meme) => {
      queryClient.invalidateQueries({
        queryKey: queries.meme.getAll().queryKey
      })
      queryClient.setQueryData(queries.meme.getOne(meme.id).queryKey, meme)
      navigate({
        to: `/memes/$memeId`,
        replace: false,
        params: {
          memeId: meme.id
        }
      })
      enqueueSnackbar('Mème créé avec succès', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Une erreur inconnue est survenue', { variant: 'error' })
    }
  })

  const handleChange = (files: File[]) => {
    const [file] = Array.from(files || [])

    if (file) {
      setImageFile(file)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (
      newMemeMutation.isPending ||
      !imageFile ||
      !imgNaturalDimensions ||
      !nameValue
    ) {
      return
    }

    newMemeMutation.mutate({
      image: imageFile,
      name: nameValue,
      ...imgNaturalDimensions
    })
  }

  const handleImgLoad = () => {
    if (imgRef.current) {
      setImgNaturalDimensions({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight
      })
    }
  }

  const slug = nameValue
    ? getMemeSlug({
        name: nameValue,
        id: 'ID'
      })
    : ''

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={4} alignItems="center">
        <Container maxWidth="md">
          <DropZone
            label="Ajouter une image"
            maxFiles={1}
            allowedExtension={[
              FileExtensions.jpg,
              FileExtensions.png,
              FileExtensions.jpg
            ]}
            maxSizeInMb={3}
            onDropFiles={handleChange}
          />
          <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Stack direction="column" gap={3}>
              <Stack direction="column" alignItems="center" gap={1}>
                {imageUrl ? (
                  <>
                    <ImgStyled
                      onLoad={handleImgLoad}
                      ref={imgRef}
                      src={imageUrl}
                      alt=""
                    />
                    {imgNaturalDimensions ? (
                      <Typography variant="body2">
                        {imgNaturalDimensions.width} x{' '}
                        {imgNaturalDimensions.height}
                      </Typography>
                    ) : null}
                  </>
                ) : null}
              </Stack>
              <TextField
                label="Nom"
                fullWidth
                required
                type="text"
                autoComplete="off"
                value={nameValue}
                onChange={(event) => {
                  return setNameValue(event.target.value)
                }}
                helperText={slug ? `Le slug ressemblera à ${slug}` : ' '}
                spellCheck="false"
              />
            </Stack>
          </Container>
        </Container>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={newMemeMutation.isPending}
          disabled={!imageUrl}
        >
          Ajouter le meme
        </LoadingButton>
      </Box>
    </form>
  )
}

export default NewMemeForm
