import { supabase } from '../lib/supabase.client';
import { generateCode } from '@utils/generateCode';
import { sendEmail } from 'src/lib/sendEmail';
import { IUserData, ITokenPayload, ILoginData } from '../types/user.interface';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET!

export const registerService = async (userData: IUserData) => {
    try {
        const { data: existingUser, error: existingUserError } = await supabase
            .from('profiles')
            .select('email')
            .eq('email', userData.email)
            .maybeSingle();

        if (existingUser) throw new Error('E-mail já cadastrado');
        if (existingUserError) throw new Error(`Erro ao verificar usuário existente: ${existingUserError.message}`);

        const passwordHash = await bcrypt.hash(userData.userPassword, 10);

        const { data: address, error: addressError } = await supabase
            .from('addresses')
            .insert({
                street: userData.address.street,
                house_number: userData.address.houseNumber,
                complement: userData.address.complement,
                neighborhood: userData.address.neighborhood,
                city: userData.address.city,
                federal_unit: userData.address.federalUnit,
                zip_code: userData.address.zipCode
            })
            .select('id')
            .single();

        if (addressError || !address) throw new Error('Erro ao cadastrar endereço');

        const { data: user, error: userError } = await supabase
            .from('profiles')
            .insert({
                email: userData.email,
                user_password: passwordHash,
                full_name: userData.fullName,
                phone: userData.phone,
                cpf: userData.cpf,
                user_type: userData.userType,
                agree_terms: userData.agreeTerms,
                gender: userData.gender,
                date_of_birth: userData.dateOfBirth,
                address_id: address.id
            })
            .select('id, full_name, email, user_type, created_at')
            .single();

        if (userError || !user) {
            await supabase.from('addresses').delete().eq('id', address.id);
            throw new Error(`Erro ao criar usuário: ${userError?.message || 'Usuário não criado'}`);
        }

        return {
            success: true,
            user
        };
    } catch (error: any) {
        console.error('Erro no cadastro:', error);
        throw error;
    }
};

export const loginService = async (data: ILoginData) => {
    try {

        const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('id, full_name, email, user_password, user_type')
            .eq('email', data.email)
            .single();

        if (userError || !userData) {
            throw new Error('Credenciais inválidas.');
        }

        const isPasswordValid = await bcrypt.compare(data.userPassword, userData.user_password);

        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas.');
        }

        if (userData.user_type !== data.userType) {
            throw new Error("Tipo de usuário diferente")
        }

        const tokenPayload: ITokenPayload = {
            userId: userData.id,
            userType: userData.user_type,
        };
        const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1d' });

        const { user_password, ...userWithoutPassword } = userData;

        return { token, user: userWithoutPassword };
    } catch (error: any) {
        console.error('Erro no loginUser:', error.message);
        throw error;
    }
};

export const forgotPassService = async (email: string) => {
  const { data: user } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (!user) {
    return { message: "Se o email existir, enviaremos um código de recuperação" };
  }

  const rawCode = generateCode();
  const hashedCode = await bcrypt.hash(rawCode, 10);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await supabase.from("recovery_codes").upsert(
    {
      user_id: user.id,
      code_hash: hashedCode,
      expire_at: expiresAt.toISOString(),
      created_at: new Date().toISOString(),
      
    },
    { onConflict: "user_id" }
  );

  await sendEmail(email, rawCode);

  return { message: "Se o email existir, enviaremos um código de recuperação" };
};

export const resetPasswordService = async (
  email: string,
  code: string,
  newPassword: string
) => {
  if (!newPassword || newPassword.length < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres");
  }

  code = code.trim();

  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (userError || !user) {
    throw new Error("Usuário não encontrado");
  }

  const { data: recovery, error: recoveryError } = await supabase
    .from("recovery_codes")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const isCodeValid = recovery?.code_hash
    ? await bcrypt.compare(code, recovery.code_hash)
    : false;

  if (
    recoveryError ||
    !recovery ||
    !isCodeValid ||
    new Date(recovery.expire_at) < new Date()
  ) {
    throw new Error("Código inválido ou expirado");
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ user_password: hashedPassword })
      .eq("id", user.id);

    if (updateError) {
      throw new Error("Erro ao atualizar senha");
    }

    
    const { error: deleteError } = await supabase
      .from("recovery_codes")
      .delete()
      .eq("id", recovery.id);

    if (deleteError) {
      throw new Error("Erro ao apagar código de recuperação");
    }

    return { message: "Senha redefinida com sucesso" };
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    throw error;
  }
};
