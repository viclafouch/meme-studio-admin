import React from 'react'
import { Container } from '@mui/material'
import Header from './Header'

export type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Header />
      <Container
        component="main"
        sx={{ py: 5, flexGrow: 1, position: 'relative' }}
      >
        {children}
      </Container>
    </>
  )
}

export default AuthLayout
