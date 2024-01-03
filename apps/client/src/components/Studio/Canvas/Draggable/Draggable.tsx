import React from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { useDraggable } from '@viclafouch/meme-studio-utilities/hooks'
import { TextBox } from '@viclafouch/meme-studio-utilities/schemas'
import { DraggableBox, ResizeBox, RotateBox } from './Draggable.styles'

export type DraggableProps = {
  item: TextBox
  updateItem: (
    itemId: string,
    itemValues: Partial<TextBox['properties']>
  ) => void
  canvasHeight: number
  canvasWidth: number
  isSelected: boolean
  onClick: (item: TextBox) => void
}

const Draggable = ({
  canvasHeight,
  canvasWidth,
  item,
  updateItem,
  isSelected,
  onClick
}: DraggableProps) => {
  const { rootProps, resizerProps, resizersPropsBySide, rotateProps } =
    useDraggable({ item, updateItem, canvasHeight, canvasWidth })

  return (
    <DraggableBox
      {...(rootProps as React.ComponentProps<typeof DraggableBox>)}
      aria-selected={isSelected}
      onClick={() => {
        return onClick(item)
      }}
    >
      {(
        Object.keys(resizersPropsBySide) as (keyof typeof resizersPropsBySide)[]
      ).map((side) => {
        return (
          <ResizeBox
            key={side}
            {...resizerProps}
            {...resizersPropsBySide[side]}
          />
        )
      })}

      <RotateBox {...rotateProps}>
        <AutorenewIcon fontSize="small" />
      </RotateBox>
    </DraggableBox>
  )
}

export default React.memo(Draggable)
