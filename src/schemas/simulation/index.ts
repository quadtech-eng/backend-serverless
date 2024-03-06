import * as Yup from 'yup'

import { FORM_OF_PAYMENT, PAYMENT_TYPE } from '@constants/index'

export const SimulationSchema = Yup.object().shape({
  vehicleOfferId: Yup.string().required(),
  paymentType: Yup.string()
    .oneOf([PAYMENT_TYPE.CASH, PAYMENT_TYPE.FINANCING])
    .required(),
  upfrontPayment: Yup.number().required(),
  period: Yup.number().required(),
  formOfPayment: Yup.string()
    .oneOf([
      FORM_OF_PAYMENT.PER_WEEK,
      FORM_OF_PAYMENT.FORTNITE,
      FORM_OF_PAYMENT.PER_MONTH,
    ])
    .required(),
  email: Yup.string().email().required(),
})

export type SimulationSchemaType = Yup.InferType<typeof SimulationSchema>
