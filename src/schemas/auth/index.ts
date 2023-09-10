import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  clientIp: Yup.string().required('client-ip is a required field'),
})

export const RecoverySchema = Yup.object().shape({
  email: Yup.string().email().required(),
})

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})
