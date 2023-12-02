import { useEffect } from 'react'
import Button from '@mui/material/Button'

const App = () => {
  useEffect(() => {
    fetch('/api/memes')
  }, [])

  return (
    <Button variant="text" color="primary">
      test
    </Button>
  )
}

export default App
