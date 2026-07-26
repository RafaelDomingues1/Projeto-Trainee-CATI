import api from './Api.ts'
import {LoginResponse} from "../types/LoginResponse.ts";

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {

    localStorage.removeItem('token')
    
    const response = await api.post<LoginResponse>(
        '/auth/aluno',
        {
            email,
            password,
        }
    )

    return response.data
}