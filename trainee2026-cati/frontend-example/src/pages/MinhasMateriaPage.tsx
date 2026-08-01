import { useEffect, useState } from 'react'

import DashboardHeader from '../components/DashboardHeader'
import MatriculaCard from '../components/MatriculaCard'
import CreditProgress from '../components/CreditProgress'

import mockUser from '../services/mockUser'
import { buscarPerfil } from '../services/AlunoServices'

import {
    listarMatriculas,
    deletarMatricula
} from '../services/MatriculaServices'

import type { Disciplina } from '../types/Disciplina'
import type { Perfil } from '../types/Perfil'
import type { Page } from '../types'
import FeedbackBanner from "../components/FeedbackBanner.tsx";
import type {FeedbackData} from "../types/FeedbackType.ts";
import {GetErrorMensage} from "../utils/GetErrorMessage.ts";

interface MinhasMateriaPageProps {
    onNavigate: (page: Page) => void
}

export default function MinhasMateriaPage({onNavigate}: MinhasMateriaPageProps) {

    const [perfil, setPerfil] = useState<Perfil | null>(null)

    const [matriculas, setMatriculas] = useState<Disciplina[]>([])

    const [carregando, setCarregando] = useState(true)

    const [erro, setErro] = useState('')

    const[feedback,setFeedback] = useState<FeedbackData | null>(null)


    useEffect(() => {

        async function carregarPerfil() {

            try {

                const dados = await buscarPerfil()

                setPerfil(dados)

            } catch (error) {

                console.error('Erro ao carregar o perfil:', error)
            }
        }

        carregarPerfil()

    }, [])


    async function carregarMatriculas() {

        try {

            setCarregando(true)
            setErro('')

            const dados = await listarMatriculas()

            console.log('MINHAS MATRÍCULAS:', dados)

            setMatriculas(dados)

        } catch (error) {

            console.error('Erro ao carregar matrículas:', error)

            setErro('Não foi possível carregar suas matérias.')

        } finally {

            setCarregando(false)

        }
    }


    useEffect(() => {

        carregarMatriculas()

    }, [])


    async function handleCancelar(disciplinaId: string) {

        const confirmou = window.confirm('Tem certeza que deseja cancelar essa matrícula?')

        if (!confirmou) {
            return
        }

        try {

            await deletarMatricula(disciplinaId)

            setFeedback({type: 'success',title: 'Matrícula cancelada', message: 'A disciplina foi removida das suas matérias.'})

            await carregarMatriculas()

        } catch (error) {

             const mensagem =GetErrorMensage(error,'Não foi possível cancelar matrícula.')

           setFeedback({type:'error',title:'Erro ao cancelar a matrícula',message:mensagem})
        }
    }


    const creditosMatriculados =
        matriculas.reduce((total, disciplina) => total + disciplina.credits, 0)


    const usuario = perfil
        ? {
            ...mockUser,
            name: perfil.name,
            email: perfil.email
        }
        : mockUser


    return (
        <div className="min-h-screen bg-ui-bg">

            <DashboardHeader
                user={usuario}
                currentPage="minhasMaterias"
                onNavigate={onNavigate}
            />

            <main
                className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-8
          sm:py-10
        "
            >

                <div className="mb-6">

                    <h1 className="text-2xl font-bold text-ui-dark">
                        Minhas Matérias
                    </h1>

                    <p className="mt-1 text-sm text-ui-muted">
                        Disciplinas matriculadas no semestre atual
                    </p>

                </div>

                {feedback && (<div className="mb-6">

                        <FeedbackBanner
                            type={feedback.type}
                            title={feedback.title}
                            message={feedback.message}
                            onClose={() => setFeedback(null)}
                        />

                    </div>
                )}


                <CreditProgress
                    credits={creditosMatriculados}
                />


                {carregando && (

                    <p className="mt-8 text-sm text-ui-muted">
                        Carregando matérias...
                    </p>

                )}


                {!carregando && erro && (

                    <p className="mt-8 text-sm text-red-600">
                        {erro}
                    </p>

                )}


                {!carregando &&
                    !erro &&
                    matriculas.length === 0 && (

                        <div
                            className="
                mt-8
                bg-white
                border
                border-ui-border
                rounded-xl
                p-8
                text-center
              "
                        >

                            <h2 className="font-semibold text-ui-dark">
                                Nenhuma matéria matriculada
                            </h2>

                            <p className="mt-2 text-sm text-ui-muted">
                                Acesse o catálogo para escolher suas disciplinas.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    onNavigate('dashboard')
                                }
                                className="
                  mt-5
                  bg-brand-primary
                  text-white
                  text-sm
                  font-medium
                  px-5
                  py-2
                  rounded-lg
                "
                            >
                                Ir para o catálogo
                            </button>

                        </div>

                    )}


                {!carregando &&
                    !erro &&
                    matriculas.length > 0 && (

                        <div
                            className="
                mt-8
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
                        >

                            {matriculas.map((disciplina) => (

                                <MatriculaCard
                                    key={disciplina.id}
                                    disciplina={disciplina}
                                    onCancelar={handleCancelar}
                                />

                            ))}

                        </div>

                    )}

            </main>

        </div>
    )
}