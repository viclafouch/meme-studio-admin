import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { newMeme } from '../../api/memes'
import { ImgStyled, VisuallyHiddenInputStyled } from './NewMeme.styled'

const NewMeme = () => {
  const [imageFile, setImageFile] = React.useState<File | null>(null)

  const imageUrl = React.useMemo(() => {
    return imageFile ? URL.createObjectURL(imageFile) : ''
  }, [imageFile])

  const newMemeMutation = useMutation({
    mutationFn: ({ image }: { image: File }) => {
      return newMeme({ image })
    }
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { files } = event.target
    const [file] = Array.from(files || [])

    if (file) {
      setImageFile(file)
    }
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (newMemeMutation.isPending || !imageFile) {
      return
    }

    newMemeMutation.mutate({
      image: imageFile
    })
  }

  return (
    <Box display="flex" flexDirection="column" gap={4} alignItems="flex-start">
      <Button
        component="label"
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInputStyled
          accept={'image/*'}
          type="file"
          onChange={handleChange}
        />
      </Button>
      {imageUrl ? <ImgStyled src={imageUrl} alt="" /> : null}
      <Button
        onClick={handleSubmit}
        variant="contained"
        disabled={!imageUrl}
        type="button"
      >
        Create Meme
      </Button>
    </Box>
  )
}

export default NewMeme
