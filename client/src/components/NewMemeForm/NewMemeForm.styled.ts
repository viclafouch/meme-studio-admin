import { styled } from '@mui/material'

export const ImgStyled = styled('img')(({ theme }) => {
  return {
    width: 200,
    height: 200,
    display: 'block',
    margin: 'auto',
    border: `1px solid ${theme.palette.grey[300]}`
  }
})
