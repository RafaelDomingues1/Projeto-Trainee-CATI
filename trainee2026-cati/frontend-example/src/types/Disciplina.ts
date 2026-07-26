export type StatusDisciplina =
    | 'DISPONIVEL'
    | 'INDISPONIVEL'
    | 'INSCRITA'
    | 'REPROVADA'
    | 'CONCLUIDA'

export interface Disciplina {
    id : string
    name : string
    code : string
    credits : number 
}