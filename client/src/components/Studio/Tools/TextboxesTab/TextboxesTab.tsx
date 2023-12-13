import React from 'react'
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
  const { textboxes, updateTextbox } = useTextboxes()
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

  return (
    <div>
      {textboxes.map((textbox, index) => {
        return (
          <Accordion
            key={textbox.id}
            onChange={handleToggleAccordion(textbox)}
            isOpened={itemIdSelected === textbox.id}
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
