import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material'

const Login = () => {
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
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="filled"
              required
            />
          </Stack>
          <Box mt="20px" display="flex" justifyContent="center" width="100%">
            <Button
              color="secondary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Se connecter
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Login
