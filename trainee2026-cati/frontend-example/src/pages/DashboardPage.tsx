import DashboardHeader from '../components/DashboardHeader'
import CatalogHeading from '../components/CatalogHeading'
import mockUser from '../services/mockUser'
import{buscarPerfil} from "../services/AlunoServices.ts";
import {Perfil} from "../types/Perfil.ts";
import {useEffect, useState} from "react";
import {Disciplina} from "../types/Disciplina.ts";
import {listarDisciplinas} from "../services/DisciplinaServices.ts";
import DisciplinaCard from "../components/DisciplinaCard";
import CreditProgress from "../components/CreditProgress";
import type {Page} from "../types";
import FeedbackBanner from "../components/FeedbackBanner.tsx";
import type {FeedbackData} from "../types/FeedbackType.ts";
import SearchBar from "../components/SearchBar.tsx";


interface DashboardPageProps {
    onNavigate: (page: Page) => void
}
export default function DashboardPage({onNavigate}: DashboardPageProps) {

    const[busca,setBusca] = useState('')
    const[feedback,setFeedback] = useState<FeedbackData | null>(null)
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

    const creditosMatriculados = disciplinas.filter((disciplinas) => disciplinas.status === 'INSCRITA') //seleciona as matérias com status inscrita
        .reduce((total,disciplinas) => total + disciplinas.credits,0) //soma os créditos

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

    function normalizarTexto(texto: string) {
        return texto
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
    }

    const textoBuscado = normalizarTexto(busca)

    const disciplinasFiltradas = disciplinas.filter((disciplina) => {

            const nome = normalizarTexto(disciplina.name)

            const codigo = normalizarTexto(disciplina.code)

            return (nome.includes(textoBuscado) || codigo.includes(textoBuscado)
            )
        })


    const usuario = perfil ?
        {
            ...mockUser,
            name: perfil.name,
            email: perfil.email,
            credits: perfil.credits,
        }: mockUser

    return (
    <div className="min-h-screen bg-ui-bg">
      <DashboardHeader user={usuario}
      currentPage={"dashboard"}
      onNavigate={onNavigate}/>

        {feedback && (
            <div className="mb-6">

                <FeedbackBanner
                    type={feedback.type}
                    title={feedback.title}
                    message={feedback.message}
                    onClose={() => setFeedback(null)}
                />

            </div>
        )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <CatalogHeading semestre={mockUser.semestre} />

          <div className="mt-6">

              <SearchBar
                  value={busca}
                  onChange={setBusca}
              />

          </div>

          <div className="mt-6">
              <CreditProgress credits={creditosMatriculados}/>
          </div>

          {disciplinasFiltradas.length === 0 && (

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
                      Nenhuma disciplina encontrada
                  </h2>

                  <p className="mt-2 text-sm text-ui-muted">
                      Não encontramos resultados para “{busca}”.
                  </p>

                  <button
                      type="button"
                      onClick={() => setBusca('')}
                      className="
                                mt-5
                                text-sm
                                font-medium
                                text-brand-primary
                                hover:underline
                              "
                  >
                      Limpar pesquisa
                  </button>

              </div>

          )}

          {disciplinasFiltradas.length > 0 && (


        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {disciplinasFiltradas.map((disciplinas) => ( //map percorre a lista

              <DisciplinaCard
              key = {disciplinas.id}
                disciplina={disciplinas}
              onMatriculaRealizada={carregarDisciplinas}
              onFeedback={setFeedback}
                />
              ))}

    </div>
              )}
      </main>

    </div>
  )
}
