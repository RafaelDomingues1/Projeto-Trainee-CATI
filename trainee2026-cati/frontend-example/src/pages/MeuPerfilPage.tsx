import { useEffect, useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import { buscarPerfil } from '../services/AlunoServices'
import mockUser from '../services/mockUser'
import type { Perfil } from '../types/Perfil'
import type { Page } from '../types'

interface MeuPerfilPageProps {
    onNavigate: (page: Page) => void
}

function getInitials(name?: string) {
    if (!name) {
        return 'A'
    }

    const nomes = name
        .trim()
        .split(' ')
        .filter(Boolean)

    if (nomes.length === 1) {
        return nomes[0][0].toUpperCase()
    }

    const primeiraInicial = nomes[0][0]
    const ultimaInicial = nomes[nomes.length - 1][0]

    return (
        primeiraInicial + ultimaInicial
    ).toUpperCase()
}

export default function MeuPerfilPage({
                                          onNavigate
                                      }: MeuPerfilPageProps) {

    const [perfil, setPerfil] =
        useState<Perfil | null>(null)

    const [carregando, setCarregando] =
        useState(true)

    const [erro, setErro] =
        useState<string | null>(null)

    useEffect(() => {
        async function carregarPerfil() {
            try {
                setCarregando(true)
                setErro(null)

                const dados = await buscarPerfil()

                setPerfil(dados)

            } catch (error) {
                console.error(
                    'Erro ao carregar perfil:',
                    error
                )

                setErro(
                    'Não foi possível carregar os dados do perfil.'
                )

            } finally {
                setCarregando(false)
            }
        }

        carregarPerfil()
    }, [])

    const usuarioHeader = {
        name: perfil?.name ?? 'Aluno',
        periodo: mockUser.periodo
    }

    const disciplinasMatriculadas =
        perfil?.disciplinasMatriculadas ?? []

    const disciplinasConcluidas =
        perfil?.disciplinasConcluidas ?? []

    return (
        <div className="min-h-screen bg-ui-bg">

            <DashboardHeader
                user={usuarioHeader}
                currentPage="perfil"
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

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-ui-dark">
                        Meu perfil
                    </h1>

                    <p className="mt-2 text-sm text-ui-muted">
                        Consulte seus dados pessoais e acadêmicos.
                    </p>
                </div>

                {carregando && (
                    <div
                        className="
              bg-white
              border
              border-ui-border
              rounded-xl
              p-8
              text-center
              text-ui-muted
            "
                    >
                        Carregando perfil...
                    </div>
                )}

                {!carregando && erro && (
                    <div
                        className="
              bg-red-50
              border
              border-red-200
              text-red-700
              rounded-xl
              p-5
            "
                    >
                        {erro}
                    </div>
                )}

                {!carregando && !erro && perfil && (
                    <div className="space-y-6">

                        {/* Informações principais */}
                        <section
                            className="
                bg-white
                border
                border-ui-border
                rounded-2xl
                shadow-sm
                p-6
              "
                        >
                            <div
                                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  gap-5
                "
                            >

                                <div
                                    className="
                    w-20
                    h-20
                    rounded-full
                    bg-brand-primary
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                                >
                  <span className="text-white text-2xl font-bold">
                    {getInitials(perfil.name)}
                  </span>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-ui-dark">
                                        {perfil.name}
                                    </h2>

                                    <p className="mt-1 text-ui-muted">
                                        {perfil.email}
                                    </p>

                                    <span
                                        className="
                      inline-block
                      mt-3
                      bg-brand-light
                      text-brand-primary
                      text-sm
                      font-medium
                      px-3
                      py-1
                      rounded-full
                    "
                                    >
                    {mockUser.periodo}
                  </span>
                                </div>

                            </div>
                        </section>

                        {/* Resumo acadêmico */}
                        <section
                            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
              "
                        >

                            <div className="bg-white border border-ui-border rounded-xl p-5">
                <span className="text-sm text-ui-muted">
                  Semestre
                </span>

                                <p className="mt-2 text-xl font-bold text-ui-dark">
                                    {mockUser.semestre}
                                </p>
                            </div>

                            <div className="bg-white border border-ui-border rounded-xl p-5">
                <span className="text-sm text-ui-muted">
                  Período
                </span>

                                <p className="mt-2 text-xl font-bold text-ui-dark">
                                    {mockUser.periodo}
                                </p>
                            </div>

                            <div className="bg-white border border-ui-border rounded-xl p-5">
                <span className="text-sm text-ui-muted">
                  Créditos atuais
                </span>

                                <p className="mt-2 text-xl font-bold text-brand-primary">
                                    {perfil.credits ?? 0} / 24
                                </p>
                            </div>

                            <div className="bg-white border border-ui-border rounded-xl p-5">
                <span className="text-sm text-ui-muted">
                  Disciplinas concluídas
                </span>

                                <p className="mt-2 text-xl font-bold text-green-700">
                                    {disciplinasConcluidas.length}
                                </p>
                            </div>

                        </section>

                        {/* Matérias matriculadas */}
                        <section
                            className="
                bg-white
                border
                border-ui-border
                rounded-2xl
                shadow-sm
                p-6
              "
                        >
                            <h2 className="text-lg font-bold text-ui-dark">
                                Matérias atuais
                            </h2>

                            {disciplinasMatriculadas.length === 0 ? (
                                <p className="mt-4 text-sm text-ui-muted">
                                    Você não está inscrito em nenhuma disciplina.
                                </p>
                            ) : (
                                <div className="mt-5 space-y-3">

                                    {disciplinasMatriculadas.map((nomeDisciplina, index) => (
                                        <div
                                            key={`matriculada-${nomeDisciplina}-${index}`}
                                            className="
                        border
                        border-ui-border
                        rounded-xl
                        p-4
                      "
                                        >
                                            <p className="font-semibold text-ui-dark">
                                                {nomeDisciplina}
                                            </p>

                                            <span
                                                className="
                          inline-block
                          mt-2
                          bg-brand-light
                          text-brand-primary
                          text-xs
                          font-medium
                          px-2
                          py-1
                          rounded-md
                        "
                                            >
                                                Matriculada
                                            </span>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </section>

                        {/* Disciplinas concluídas */}
                        <section
                            className="
                bg-white
                border
                border-ui-border
                rounded-2xl
                shadow-sm
                p-6
              "
                        >
                            <h2 className="text-lg font-bold text-ui-dark">
                                Disciplinas concluídas
                            </h2>

                            {disciplinasConcluidas.length === 0 ? (
                                <p className="mt-4 text-sm text-ui-muted">
                                    Nenhuma disciplina concluída foi encontrada.
                                </p>
                            ) : (
                                <div
                                    className="
                    mt-5
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                  "
                                >

                                    {disciplinasConcluidas.map((nomeDisciplina, index) => (
                                        <div
                                            key={`concluida-${nomeDisciplina}-${index}`}
                                            className="
                        border
                        border-green-200
                        bg-green-50
                        rounded-xl
                        p-4
                      "
                                        >
                                            <p className="font-semibold text-green-900">
                                                {nomeDisciplina}
                                            </p>

                                            <p className="mt-2 text-sm text-green-700">
                                                ✓ Concluída
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </section>

                    </div>
                )}

            </main>
        </div>
    )
}