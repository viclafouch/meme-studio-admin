import { styled } from '@mui/material'

export const DropZoneBorder = styled('div')(({ theme }) => {
  return {
    width: '100%',
    position: 'relative',
    border: `1px dotted ${theme.palette.divider}`,
    display: 'flex',
    height: '100%'
  }
})
