import api from './Api.ts'
import {Perfil} from "../types/Perfil.ts";

export async function buscarPerfil(): Promise<Perfil> {
    const response = await api.get<Perfil>('aluno/perfil') //recebe a resposta que vem de get aluno/perfil

    return response.data
}