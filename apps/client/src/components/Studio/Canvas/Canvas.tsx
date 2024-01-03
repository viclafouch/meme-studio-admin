import React from 'react'
import { Box, styled } from '@mui/material'
import {
  useCanvasDimensions,
  useDrawing,
  useItemIdSelected,
  useMeme,
  useTextboxes,
  useTools
} from '@viclafouch/meme-studio-utilities/hooks'
import { Meme, TextBox } from '@viclafouch/meme-studio-utilities/schemas'
import { CanvasStyled, CanvasWrapperStyled } from './Canvas.styled'
import Draggable from './Draggable'

const Image = styled('img')({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  width: '100%',
  zIndex: -1
})

const Canvas = () => {
  const meme = useMeme() as Meme
  const canvasElRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { textboxes, updateTextbox } = useTextboxes()
  const { canvasDimensions } = useCanvasDimensions()
  const { isVisibleDraggables } = useTools()
  const { itemIdSelected, setItemIdSelected } = useItemIdSelected()

  useDrawing({
    canvasElRef,
    containerRef
  })

  const onDraggableClick = React.useCallback(
    (item: TextBox) => {
      setItemIdSelected(item.id, true)
    },
    [setItemIdSelected]
  )

  return (
    <Box
      height="100%"
      width="100%"
      position="relative"
      sx={{ overflow: 'hidden' }}
      ref={containerRef}
    >
      <CanvasWrapperStyled
        style={{
          height: canvasDimensions.height,
          width: canvasDimensions.width
        }}
      >
        <Image src={meme.imageUrl} alt={meme.name} loading="eager" />
        {isVisibleDraggables && canvasDimensions.height
          ? textboxes.map((textbox) => {
              return (
                <Draggable
                  key={textbox.id}
                  item={textbox}
                  canvasHeight={canvasDimensions.height}
                  canvasWidth={canvasDimensions.width}
                  updateItem={updateTextbox}
                  onClick={onDraggableClick}
                  isSelected={itemIdSelected === textbox.id}
                />
              )
            })
          : null}
        <CanvasStyled
          ref={canvasElRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
        />
      </CanvasWrapperStyled>
    </Box>
  )
}

export default Canvas
