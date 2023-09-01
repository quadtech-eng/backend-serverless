import api from '@service/api'

export const generateAuth0Token = async () => {
  const data = JSON.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
  })

  const response = await api.post('/oauth/token', data, {
    headers: {
      'content-type': 'application/json',
    },
  })
  return response.data.access_token
}
