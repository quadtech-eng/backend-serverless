export const parseToken = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  } catch (error) {
    console.error('Error parsing token:', error)
    return null
  }
}
