import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  clientIp: Yup.string().required('client-ip is a required field'),
})

export type LoginSchemaType = Yup.InferType<typeof LoginSchema>

export const RecoverySchema = Yup.object().shape({
  email: Yup.string().email().required(),
})

export type RecoverySchemaType = Yup.InferType<typeof RecoverySchema>

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export type RegisterSchemaType = Yup.InferType<typeof RegisterSchema>
