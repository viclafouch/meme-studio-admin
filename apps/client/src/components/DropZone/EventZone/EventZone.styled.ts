import { styled } from '@mui/material'

export const DropZoneLoading = styled('div')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  zIndex: 3
})

export const DropZoneLabel = styled('label')({
  inset: 0,
  position: 'absolute',
  backgroundColor: 'transparent',
  zIndex: 2,
  cursor: 'pointer'
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

export const WrapperContent = styled('div')(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export const BrowseSpan = styled('span')(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    textDecoration: 'underline'
  }
})
