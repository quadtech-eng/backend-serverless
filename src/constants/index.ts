export const AUTH0 = {
  CONNECTION: 'Username-Password-Authentication',
  GRANT_TYPE: 'password',
  AUTH0_SCOPE: 'openid profile email',
}

export const SSM = {
  TOKEN: `${process.env.ENVIRONMENT}-tokenAuth0`,
}
