import React from 'react'
import Header from './Header'

export type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default AuthLayout
