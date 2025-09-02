import { supabase } from '../lib/supabase.client';
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