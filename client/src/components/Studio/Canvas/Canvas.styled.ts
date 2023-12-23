import { styled } from '@mui/material'

export const CanvasWrapperStyled = styled('div')({
  zIndex: 2,
  boxShadow: '0 1px 4px rgb(0 0 0 / 30%), 0 0 40px rgb(0 0 0 / 10%) inset'
})

export const CanvasStyled = styled('canvas')({
  position: 'relative',
  zIndex: -1
})
