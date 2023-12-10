import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../../stores/Auth'

const pages = ['Memes']

const ResponsiveAppBar = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate({
        to: '/login'
      })
    }
  })

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    logoutMutation.mutate()
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => {
              return (
                // @ts-expect-error
                <Button
                  key={page}
                  LinkComponent={Link}
                  to="/memes"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              )
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={handleLogout}>Se deconnecter</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
