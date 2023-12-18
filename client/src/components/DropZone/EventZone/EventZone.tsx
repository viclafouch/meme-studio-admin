import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  BrowseSpan,
  DropZoneLabel,
  VisuallyHiddenInputStyled,
  WrapperContent
} from './EventZone.styled'

export type EventZoneProps = {
  inputProps?: React.ComponentPropsWithoutRef<'input'>
  onDropFiles: (files: File[]) => void
  textError?: string
  label?: string
}

const defaultInputProps: EventZoneProps['inputProps'] = {}

const EventZone = ({
  inputProps = defaultInputProps,
  onDropFiles,
  textError = '',
  label = ''
}: EventZoneProps) => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const inputRef = React.useRef<HTMLInputElement>()
  const uuid = React.useId()

  const clearInputValue = () => {
    const inputEl = inputRef.current

    if (inputEl) {
      inputEl.value = ''
    }
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    const files = Array.from(event.dataTransfer.files)
    onDropFiles?.(files)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    onDropFiles?.(files)
    clearInputValue()
  }

  return (
    <Box
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      width="100%"
      sx={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <DropZoneLabel htmlFor={uuid} />
      <VisuallyHiddenInputStyled
        {...inputProps}
        type="file"
        as={undefined}
        id={uuid}
        autoComplete="off"
        tabIndex={0}
        ref={inputRef as React.MutableRefObject<HTMLInputElement>}
        onChange={handleChange}
      />
      <WrapperContent>
        <Box>
          <Typography gutterBottom variant="h5">
            {label ||
              (inputProps?.multiple
                ? 'Sélectionner des fichiers'
                : 'Sélectionner un fichier')}
          </Typography>
          <Box mt={1}>
            <Typography color="textPrimary" variant="body2">
              {inputProps?.multiple
                ? 'Déposez des fichiers ici ou '
                : 'Déposez un fichier ici '}
              <BrowseSpan>parcourez</BrowseSpan> dans votre appareil.
            </Typography>
          </Box>
          {textError ? (
            <Typography variant="caption" color="error">
              {textError}
            </Typography>
          ) : null}
        </Box>
      </WrapperContent>
    </Box>
  )
}

export default EventZone
