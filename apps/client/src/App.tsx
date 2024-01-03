import React from 'react'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient } from './config/query-client'
import { router } from './routes'
import AuthProvider from './stores/Auth'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const InputGlobalStyles = (
  <GlobalStyles
    styles={{
      '#root': { minHeight: '100dvh', display: 'flex', flexDirection: 'column' }
    }}
  />
)

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={darkTheme}>
          <SnackbarProvider autoHideDuration={5000}>
            <CssBaseline />
            {InputGlobalStyles}
            <RouterProvider router={router} />
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
