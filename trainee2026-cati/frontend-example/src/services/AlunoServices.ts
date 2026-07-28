import api from './Api.ts'
import {Perfil} from "../types/Perfil.ts";
import {CadastroAluno} from "../types/CadastroAluno.ts";

export async function buscarPerfil(): Promise<Perfil> {
    const response = await api.get<Perfil>('aluno/perfil') //recebe a resposta que vem de get aluno/perfil

    return response.data
}
export async function cadastrarAluno(aluno: CadastroAluno): Promise<void>{

    await api.post('aluno/',aluno)
}