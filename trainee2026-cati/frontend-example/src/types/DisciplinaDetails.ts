export interface PrerequisitoDetalhado{
    code:string
    name:string
    description:string
}

export interface DisciplinaDetails{
    description: string
    professor: string
    prerequisitos:PrerequisitoDetalhado[]
}