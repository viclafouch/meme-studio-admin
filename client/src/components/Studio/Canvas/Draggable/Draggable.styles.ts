import { styled } from '@mui/material/styles'

const resizeSize = '1.125rem' as const

export const DraggableBox = styled('div')(({ theme }) => {
  return {
    position: 'absolute',
    zIndex: 1,
    cursor: 'move',
    bgColor: 'transparent',
    '--color-widget': theme.palette.grey[500],
    border: '0.0625rem dotted var(--color-widget)',
    "&[aria-selected='true']": {
      '--color-widget': theme.palette.primary.dark
    }
  }
})

export const RotateBox = styled('div')(({ theme }) => {
  return {
    height: '2.25rem',
    width: '2.25rem',
    cursor: 'move',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-widget)',
    position: 'absolute',
    top: 'calc(100% + 2.25rem)',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: theme.palette.primary.contrastText,
    padding: '0.3rem',
    borderWidth: '0.0625rem',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.contrastText
  }
})

export const ResizeBox = styled('div')(({ theme }) => {
  return {
    position: 'absolute',
    width: resizeSize,
    height: resizeSize,
    borderRadius: '50%',
    zIndex: 2,
    transform: 'translate(-50%, -50%)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.contrastText,
    backgroundColor: 'var(--color-widget)',
    "&[data-side='nw'], &[data-side='se']": {
      cursor: 'nwse-resize'
    },
    "&[data-side='ne'],&[data-side='sw']": {
      cursor: 'nesw-resize'
    },
    "&[data-side^='n']": {
      top: 0
    },
    "&[data-side^='s']": {
      top: '100%'
    },
    "&[data-side$='e']": {
      left: '100%'
    },
    "&[data-side$='w']": {
      left: 0
    }
  }
})
