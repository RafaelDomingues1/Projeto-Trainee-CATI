import api from './Api'
import {Disciplina} from "../types/Disciplina.ts";

export async function matricular(disciplinaId:string):Promise<void>{

    await api.post('matricula/', {disciplinaId})

}


export async function listarMatriculas(): Promise<Disciplina[]> {

    const response = await api.get<Disciplina[]>('matricula/')

    return response.data



}

export async function deletarMatricula(disciplinaId:string):Promise<void>{

    await api.delete (`/matricula/${disciplinaId}`)






}