import React from 'react'
import { useAuth } from '../../stores/Auth'

const Home = () => {
  const { token } = useAuth()

  React.useEffect(() => {
    fetch('/api/auth/memes', {
      credentials: 'same-origin'
    })
  }, [token])

  return <div>Home</div>
}

export default Home
