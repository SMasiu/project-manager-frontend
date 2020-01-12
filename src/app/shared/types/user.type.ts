export interface MeType {
    id: string;
    email: string;
    nick: string;
    name: string;
    surname: string;
}

export interface LoginDataType {
    userName: string;
    password: string;
}

export interface NewUserType extends Omit<MeType, 'id'> {
    password: string;
    confirmPassword: string;
}