import React from 'react'
import { Box } from '@mui/material'
import { FileExtensions } from '../../constants/file'
import {
  joinFileExtensions,
  matchIsValidFilesExtension,
  matchIsValidFilesLength,
  matchIsValidFilesSize
} from '../../helpers/file'
import { DropZoneBorder } from './DropZone.styled'
import EventZone from './EventZone'

type DropzoneErrorReason = 'TOO_MANY_FILES' | 'NOT_VALID_EXTENSION' | 'TOO_BIG'

export type DropZoneProps = {
  onDropFiles: (files: File[]) => void
  maxSizeInMb?: number
  maxFiles?: number
  label?: string
  allowedExtension?: FileExtensions[] | '*'
  inputProps?: React.ComponentPropsWithoutRef<'input'>
}

const defaultInputProps: DropZoneProps['inputProps'] = {}

const DropZone = ({
  onDropFiles,
  allowedExtension = '*',
  maxSizeInMb = Infinity,
  maxFiles = 1,
  inputProps = defaultInputProps,
  label = ''
}: DropZoneProps) => {
  const [textError, setTextError] = React.useState<string>('')

  const getErrorText = (errorReason: DropzoneErrorReason) => {
    switch (errorReason) {
      case 'TOO_BIG':
        return `Fichier trop volumineux. Max ${maxSizeInMb} Mb.`
      case 'NOT_VALID_EXTENSION':
        if (Array.isArray(allowedExtension)) {
          return `Extension de fichier ne respecte pas ${allowedExtension.join(
            ', '
          )}.`
        }

        return `Extension de fichier(s) n'est pas correct`
      case 'TOO_MANY_FILES':
        return `Nombre max de fichiers dépassé. Max ${maxFiles}.`
      default:
        return ''
    }
  }

  const handleFailedValidation = (reasonText: DropzoneErrorReason) => {
    const errorValue = getErrorText(reasonText)
    setTextError(errorValue)
  }

  const checkFilesValidation = (files: File[]) => {
    const isValidMaxLength = maxFiles
      ? matchIsValidFilesLength(files, maxFiles)
      : true

    if (!isValidMaxLength) {
      handleFailedValidation('TOO_MANY_FILES')

      return
    }

    const isValidExtensions = matchIsValidFilesExtension(
      files,
      allowedExtension
    )

    if (!isValidExtensions) {
      handleFailedValidation('NOT_VALID_EXTENSION')

      return
    }

    const isValidSize = matchIsValidFilesSize(files, maxSizeInMb)

    if (!isValidSize) {
      handleFailedValidation('TOO_BIG')

      return
    }

    setTextError('')
    onDropFiles?.(files)
  }

  const accept =
    allowedExtension === '*' ? '' : joinFileExtensions(allowedExtension)
  const multiple = typeof maxFiles === 'number' && maxFiles > 1

  const inputCombinedProps: React.ComponentPropsWithoutRef<'input'> = {
    accept,
    multiple,
    ...inputProps
  }

  return (
    <Box position="relative" width="100%" height={200}>
      <DropZoneBorder>
        <EventZone
          label={label}
          inputProps={inputCombinedProps}
          onDropFiles={checkFilesValidation}
          textError={textError}
        />
      </DropZoneBorder>
    </Box>
  )
}

export default DropZone
