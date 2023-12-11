import { styled } from '@mui/material'

export const ImgStyled = styled('img')({
  maxWidth: 300
})

export const VisuallyHiddenInputStyled = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
