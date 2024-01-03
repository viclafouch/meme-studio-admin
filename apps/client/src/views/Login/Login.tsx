import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../stores/Auth'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({
        to: '/'
      })
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    loginMutation.mutate({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })
  }

  return (
    <Box
      sx={{
        backgroundImage: "url('/particles.svg')",
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'repeat-y',
        backgroundSize: 'cover'
      }}
      minHeight="100dvh"
      display="flex"
      alignItems="center"
      width="100%"
    >
      <Container maxWidth="xs">
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          width="100%"
          onSubmit={handleSubmit}
        >
          <Typography mb="30px" variant="h4" align="center">
            Meme Studio Admin
          </Typography>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="filled"
              required
              name="email"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="filled"
              required
              name="password"
            />
          </Stack>
          <Box mt="20px" display="flex" justifyContent="center" width="100%">
            <LoadingButton
              color="secondary"
              loading={loginMutation.isPending}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Se connecter
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Login
