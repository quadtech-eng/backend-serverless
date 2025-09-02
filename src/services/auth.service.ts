import { supabase } from '../lib/supabase.client';
import { IUserData } from '../types/user.interface';
import * as bcrypt from 'bcryptjs';

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
