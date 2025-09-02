export type UserType = 'family' | 'educator' | 'therapist' | 'school' | 'student';

export type Gender = 'female' | 'male' | 'other';

export interface IAddress {
    street: string;
    houseNumber: string;
    complement?: string;
    neighborhood: string;
    city: string;
    federalUnit: string;
    zipCode: string;
}

export interface IUserData {
    fullName: string;
    email: string;
    phone?: string;
    cpf: string;
    address: IAddress;
    userPassword: string;
    userType: UserType;
    gender: Gender;
    dateOfBirth: string;
    agreeTerms: boolean;
}


export interface ILoginData {
    email: string;
    userPassword: string;
    userType: UserType;
}

export interface ITokenPayload {
    userId: string;
    userType: UserType;
}

