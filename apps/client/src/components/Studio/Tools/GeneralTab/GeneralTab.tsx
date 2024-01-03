import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { MuiChipsInput } from 'mui-chips-input'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip
} from '@mui/material'
import { Locales, locales } from '@viclafouch/meme-studio-utilities/constants'
import { useClipboard } from '@viclafouch/meme-studio-utilities/hooks'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { getMemeSlug } from '@viclafouch/meme-studio-utilities/utils'
import { getKeys } from '../../../../helpers/object'
import { UpdateMemeSchema } from '../../../../validator/update-meme'

export type GeneralTabProps = {
  meme: Meme
}

const GeneralTab = ({ meme }: GeneralTabProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext<UpdateMemeSchema>()
  const { copy } = useClipboard()
  const [currentLocale, setCurrentLocale] = React.useState<Locales>('en')

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    copy(new Blob([meme.imagePublicId], { type: 'text/plain' }))
  }

  const handleChangeLocale = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentLocale(event.target.value as Locales)
  }

  const localeTextByLocales: {
    [key in Locales]: string
  } = {
    fr: 'Français',
    en: 'Anglais'
  }

  return (
    <Stack mt={2} direction="column" gap={2}>
      <Stack direction="column" gap={2}>
        <FormControl>
          <FormLabel>Langue</FormLabel>
          <RadioGroup value={currentLocale} row name="row-radio-buttons-group">
            <FormControlLabel
              value="en"
              control={<Radio onChange={handleChangeLocale} />}
              label="Anglais"
            />
            <FormControlLabel
              value="fr"
              control={<Radio onChange={handleChangeLocale} />}
              label="Français"
            />
          </RadioGroup>
        </FormControl>
        {getKeys(locales).map((localeKey) => {
          const locale = locales[localeKey]
          const localeText = localeTextByLocales[localeKey]

          return (
            <Stack
              direction="column"
              gap={3}
              key={localeKey}
              display={locale === currentLocale ? 'flex' : 'none'}
            >
              <Controller
                name={`${localeKey}.name`}
                control={control}
                render={({ field }) => {
                  const { ref, ...restField } = field
                  const errorMessage = errors[localeKey]?.name?.message

                  return (
                    <TextField
                      error={Boolean(errorMessage)}
                      helperText={
                        errorMessage ||
                        `Le slug est : ${getMemeSlug({
                          name: field.value,
                          id: meme.id
                        })}`
                      }
                      inputRef={ref}
                      label={`Nom (${localeText})`}
                      fullWidth
                      size="small"
                      {...restField}
                    />
                  )
                }}
              />
              <Controller
                name={`${localeKey}.keywords`}
                control={control}
                render={({ field }) => {
                  const errorMessage = errors[localeKey]?.keywords?.message

                  return (
                    <MuiChipsInput
                      {...field}
                      label={`Mots clefs (${localeText})`}
                      disableEdition
                      error={Boolean(errorMessage)}
                      helperText={errorMessage}
                    />
                  )
                }}
              />
            </Stack>
          )
        })}
      </Stack>
      <TextField
        value={meme.imageUrl}
        label="Image URL"
        fullWidth
        variant="filled"
        size="small"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                LinkComponent="a"
                href={meme.imageUrl}
                target="_blank"
                color="info"
                aria-label="Ouvrir le lien de l'image"
              >
                <Tooltip title="Ouvrir le lien" placement="top">
                  <OpenInNewIcon fontSize="small" />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Stack direction="row" gap={2}>
        <TextField
          value={meme.width}
          label="Largeur"
          fullWidth
          variant="filled"
          size="small"
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">px</InputAdornment>
          }}
        />
        <TextField
          value={meme.height}
          label="Hauteur"
          fullWidth
          variant="filled"
          size="small"
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">px</InputAdornment>
          }}
        />
      </Stack>
      <TextField
        value={meme.imagePublicId}
        label="Cloudinary ID"
        fullWidth
        variant="filled"
        size="small"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCopy} color="info" aria-label="Copier">
                <Tooltip title="Copier" placement="top">
                  <ContentCopyIcon fontSize="small" />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Stack>
  )
}

export default GeneralTab
