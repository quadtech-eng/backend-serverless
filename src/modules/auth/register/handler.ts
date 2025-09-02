import { APIGatewayProxyHandler } from 'aws-lambda'
import { registerService } from '../../../services/auth.service'
import { Gender, IAddress, UserType } from 'src/types/user.interface'

interface RegisterBody {
  fullName: string
  email: string
  userPassword: string
  phone?: string
  cpf: string
  address: IAddress
  userType: UserType
  gender: Gender;
  dateOfBirth: string;
  agreeTerms: boolean

}

export const register: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event?.body || '{}') as RegisterBody

    // await RegisterSchema.validate(body, { abortEarly: false })

    const result = await registerService(body)

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: 'Usuário cadastrado com sucesso.',
          user: result.user,
        },
        null,
        2,
      ),
    }
  } catch (error: any) {
    console.error('Erro no cadastro:', error.message)

    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: error.message || 'Erro interno, tente novamente mais tarde.',
        },
        null,
        2,
      ),
    }
  }
}
