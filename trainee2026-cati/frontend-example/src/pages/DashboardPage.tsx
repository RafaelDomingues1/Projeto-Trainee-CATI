import DashboardHeader from '../components/DashboardHeader'
import CatalogHeading from '../components/CatalogHeading'
import mockUser from '../services/mockUser'
import{buscarPerfil} from "../services/AlunoServices.ts";
import {Perfil} from "../types/Perfil.ts";
import {useEffect, useState} from "react";
import {Disciplina} from "../types/Disciplina.ts";
import {listarDisciplinas} from "../services/DisciplinaServices.ts";
import DisciplinaCard from "../components/DisciplinaCard";

export default function DashboardPage() {

    const [perfil,setPerfil] = useState<Perfil | null>(null)
    const [disciplinas,setDisciplinas] = useState<Disciplina[]>([]) //disciplina = lista atual, setdisciplinas = altera a lista [] começa vazia
    useEffect(() => {
        async function carregaPerfil() {
            try {

                const dados = await buscarPerfil()
                setPerfil(dados)

            } catch (error) {
                console.error(
                    'Erro ao carregar o perfil:',
                    error
                )
            }
        }

        carregaPerfil()
    }, [])

        async function carregarDisciplinas() {

            try {

                const dados = await listarDisciplinas()

                console.log('DISCIPLINAS', dados)

                setDisciplinas(dados)
            } catch (error) {

                console.error('Erro ao carregar disciplinas:', error)
            }
        }

    useEffect(() => {

        carregarDisciplinas()
    },[])


    const usuario = perfil ?
        {
            ...mockUser,
            name: perfil.name,
            email: perfil.email,
            credits: perfil.credits,
        }: mockUser

    return (
    <div className="min-h-screen bg-ui-bg">
      <DashboardHeader user={usuario} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <CatalogHeading semestre={mockUser.semestre} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {disciplinas.map((disciplinas) => ( //map percorre a lista

              <DisciplinaCard
              key = {disciplinas.id}
                disciplina={disciplinas}
              onMatriculaRealizada={carregarDisciplinas}
                />
              ))}

    </div>

      </main>

    </div>
  )
}
