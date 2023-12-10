import React from 'react'
import { Container } from '@mui/material'
import Header from './Header'

export type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Header />
      <Container sx={{ py: 5 }}>{children}</Container>
    </div>
  )
}

export default AuthLayout
