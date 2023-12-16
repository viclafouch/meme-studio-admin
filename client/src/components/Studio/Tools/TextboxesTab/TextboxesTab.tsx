import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Stack, Tooltip } from '@mui/material'
import {
  useEvent,
  useGlobalInputsRef,
  useItemIdSelected,
  useTextboxes
} from '@viclafouch/meme-studio-utilities/hooks'
import { TextBox } from '@viclafouch/meme-studio-utilities/schemas'
import { preventEmptyTextValue } from '@viclafouch/meme-studio-utilities/utils'
import Accordion from '../../../Accordion'
import TextCustomisation from './TextCustomisation'

const TextboxesTab = () => {
  const { itemIdSelected, toggleItemIdSelected } = useItemIdSelected()
  const { textboxes, updateTextbox, removeItem, duplicateItem } = useTextboxes()
  const { getRef } = useGlobalInputsRef()

  const handleToggleAccordion = (item: TextBox) => {
    return () => {
      toggleItemIdSelected(item.id)
    }
  }

  const handleKeypress = useEvent(() => {
    if (itemIdSelected) {
      const inputElement = getRef(itemIdSelected)?.current

      if (inputElement) {
        inputElement.focus()
      }
    }
  })

  React.useEffect(() => {
    window.addEventListener('keypress', handleKeypress, false)

    return () => {
      window.removeEventListener('keypress', handleKeypress, false)
    }
  }, [handleKeypress])

  const handleRemoveTextbox = (itemId: string) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      removeItem(itemId)
    }
  }

  const handleDuplicateTextbox = (itemId: string) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      duplicateItem(itemId)
    }
  }

  return (
    <div>
      {textboxes.map((textbox, index) => {
        return (
          <Accordion
            key={textbox.id}
            onChange={handleToggleAccordion(textbox)}
            isOpened={itemIdSelected === textbox.id}
            actions={
              <Stack direction="row">
                <Tooltip title="Dupliquer" placement="top">
                  <IconButton
                    onClick={handleDuplicateTextbox(textbox.id)}
                    aria-label="Dupliquer la zone de texte"
                  >
                    <ContentCopyIcon color="action" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer" placement="top">
                  <IconButton
                    onClick={handleRemoveTextbox(textbox.id)}
                    aria-label="Supprimer la zone de texte"
                  >
                    <DeleteIcon color="action" />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
            title={preventEmptyTextValue(textbox.properties.value, index)}
          >
            <TextCustomisation
              textbox={textbox}
              index={index}
              onUpdateTextProperties={updateTextbox}
            />
          </Accordion>
        )
      })}
    </div>
  )
}

export default TextboxesTab
