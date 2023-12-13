import React from 'react'
import { MuiColorInput } from 'mui-color-input'
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Slider,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import {
  ALIGN_VERTICAL,
  FONTS_FAMILY,
  TEXT_ALIGN
} from '@viclafouch/meme-studio-utilities/constants'
import { useGlobalInputsRef } from '@viclafouch/meme-studio-utilities/hooks'
import { TextBox } from '@viclafouch/meme-studio-utilities/schemas'
import { preventEmptyTextValue } from '@viclafouch/meme-studio-utilities/utils'

export type TextCustomisationProps = {
  textbox: TextBox
  index: number
  onUpdateTextProperties: (
    textId: TextBox['id'],
    values: Partial<TextBox['properties']>
  ) => void
}

const TextCustomisation = ({
  textbox,
  index,
  onUpdateTextProperties
}: TextCustomisationProps) => {
  const { setRef } = useGlobalInputsRef()

  const handleEditText = (key: keyof TextBox['properties']) => {
    return (
      event: React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      let value = event.target.value as string | boolean

      if (event.target.getAttribute?.('type') === 'checkbox') {
        value = (event.target as HTMLInputElement).checked
      }

      onUpdateTextProperties(textbox.id, {
        [key]: value
      })
    }
  }

  const handleColorChange = (color: string) => {
    onUpdateTextProperties(textbox.id, {
      color
    })
  }

  const handleFontSizeChange = (event: Event, fontSize: number | number[]) => {
    onUpdateTextProperties(textbox.id, {
      fontSize: fontSize as number
    })
  }

  const handleBoxShadowChange = (
    event: Event,
    boxShadow: number | number[]
  ) => {
    onUpdateTextProperties(textbox.id, {
      boxShadow: boxShadow as number
    })
  }

  const { properties } = textbox

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          multiline
          maxRows={5}
          minRows={2}
          spellCheck="false"
          inputProps={{
            ref: setRef(textbox.id)
          }}
          label="Texte"
          placeholder={preventEmptyTextValue(properties.value, index)}
          onChange={handleEditText('value')}
          value={properties.value}
          fullWidth
          size="small"
        />
        <Box width="100%">
          <Typography gutterBottom>Taille de texte</Typography>
          <Slider
            value={properties.fontSize}
            onChange={handleFontSizeChange}
            step={1}
            id="font-size"
            min={1}
            max={100}
            size="small"
          />
        </Box>
        <Box width="100%">
          <Typography gutterBottom>Ombre</Typography>
          <Slider
            value={properties.boxShadow}
            onChange={handleBoxShadowChange}
            step={1}
            id="box-shadow"
            min={1}
            max={100}
            size="small"
          />
        </Box>
        <MuiColorInput
          value={properties.color}
          id="color"
          label="Couleur de texte"
          format="rgb"
          fullWidth
          onChange={handleColorChange}
          size="small"
        />
        <TextField
          id="font-family"
          select
          onChange={handleEditText('fontFamily')}
          label="Police d'écriture"
          fullWidth
          value={properties.fontFamily}
          size="small"
        >
          {FONTS_FAMILY.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          })}
        </TextField>
        <Stack direction="row" spacing={2}>
          <TextField
            id="alignVertical"
            value={properties.alignVertical}
            onChange={handleEditText('alignVertical')}
            select
            fullWidth
            size="small"
            label="Alignement vertical"
          >
            {ALIGN_VERTICAL.map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            })}
          </TextField>
          <TextField
            id="textAlign"
            value={properties.textAlign}
            onChange={handleEditText('textAlign')}
            select
            fullWidth
            size="small"
            label="Alignement horizontal"
          >
            {TEXT_ALIGN.map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            })}
          </TextField>
        </Stack>

        <FormGroup sx={{ width: '100%' }}>
          <FormControlLabel
            control={
              <Checkbox
                id="isUppercase"
                onChange={handleEditText('isUppercase')}
                checked={properties.isUppercase}
                size="small"
              />
            }
            label="Texte en majuscule"
          />
        </FormGroup>
      </Box>
    </Box>
  )
}

export default React.memo(TextCustomisation)
