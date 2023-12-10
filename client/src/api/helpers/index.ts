import wretch from 'wretch'

export const requestWithAuth = wretch('/api/auth')
  .headers({
    'content-type': 'application/json'
  })
  .options({
    credentials: 'same-origin'
  })
