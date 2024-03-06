export const AUTH0 = {
  CONNECTION: 'Username-Password-Authentication',
  GRANT_TYPE: 'password',
  AUTH0_SCOPE: 'openid profile email',
}

export const SSM = {
  TOKEN: `${process.env.ENVIRONMENT}-tokenAuth0`,
}

export const PAYMENT_TYPE = {
  CASH: 'CASH',
  FINANCING: 'FINANCING',
}

export const FORM_OF_PAYMENT = {
  PER_WEEK: 'PER_WEEK',
  FORTNITE: 'FORTNITE',
  PER_MONTH: 'PER_MONTH',
}
