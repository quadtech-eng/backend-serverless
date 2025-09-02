// import api from '@service/api'

// import { AUTH0 } from '@constants/index'
// import { LoginSchema } from '@schemas/auth'
// import { APIGatewayProxyHandler } from 'aws-lambda'

// interface LoginUserBody {
//   email: string
//   password: string
// }

// export const login: APIGatewayProxyHandler = async (event) => {
//   try {
//     const { email, password } = JSON.parse(event?.body) as LoginUserBody
//     const clientIp = event?.headers['client-ip']
//     await LoginSchema.validate(
//       { email, password, clientIp },
//       { abortEarly: false },
//     )

//     const response = await api.post(
//       '/oauth/token',
//       {
//         grant_type: AUTH0.GRANT_TYPE,
//         username: email,
//         password,
//         audience: process.env.AUTH0_AUDIENCE,
//         scope: AUTH0.AUTH0_SCOPE,
//         client_id: process.env.AUTH0_CLIENT_ID,
//         client_secret: process.env.AUTH0_CLIENT_SECRET,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           // auth0-forwarded-for serve como protecao contra ataques força bruta
//           'auth0-forwarded-for': clientIp,
//         },
//       },
//     )

//     const userinfo = await api.get('/userinfo', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${response?.data?.access_token}`,
//       },
//     })

//     return {
//       statusCode: 200,
//       body: JSON.stringify(
//         {
//           accessToken: response?.data?.access_token,
//           userInfo: userinfo?.data,
//         },
//         null,
//         2,
//       ),
//     }
//   } catch (error) {
//     console.error(
//       'error registering new user:',
//       error?.errors ||
//         error?.response?.data?.description ||
//         error?.response?.data?.error ||
//         error,
//     )

//     return {
//       statusCode: error?.response?.status || 500,
//       body: JSON.stringify(
//         {
//           error:
//             error?.errors ||
//             error?.response?.data?.description ||
//             error?.response?.data?.error ||
//             'Internal server error, please try again later.',
//         },
//         null,
//         2,
//       ),
//     }
//   }
// }
