import * as Yup from 'yup'

export const ResendActivetedSchema = Yup.object().shape({
  email: Yup.string().email().required(),
})
