import api from './Api.ts'
import {Disciplina} from "../types/Disciplina.ts";

export async function listarDisciplinas(): Promise<Disciplina[]>{ //essa função vai retornar uma lista de disciplinas
    const response = await api.get<Disciplina[]>('/disciplina/')

    return response.data
}