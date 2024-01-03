import wretch from 'wretch'
import FormDataAddon from 'wretch/addons/formData'

export const requestWithAuth = wretch('/api/auth')
  .options({
    credentials: 'same-origin'
  })
  .addon(FormDataAddon)
