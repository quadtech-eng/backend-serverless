import * as Yup from 'yup'

export const ResendActivetedSchema = Yup.object().shape({
  email: Yup.string().email().required(),
})

export const UpdateProfileSchema = Yup.object().shape({
  name: Yup.string().required(),
})

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})
