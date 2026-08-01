import type { Disciplina } from '../types/Disciplina'
import {matricular} from "../services/MatriculaServices"
import type {FeedbackData} from "../types/FeedbackType.ts"
import {GetErrorMensage} from "../utils/GetErrorMessage.ts";
import {formatarHorario} from "../utils/FormatarHorario.ts";

interface DisciplinaCardProps {
    disciplina: Disciplina
    onMatriculaRealizada: () => void | Promise<void>
    onFeedback: (feedback : FeedbackData) => void
    onVerDetalhes: (disciplina: Disciplina) => void
}

export default function DisciplinaCard({disciplina,onMatriculaRealizada,onFeedback,onVerDetalhes}: DisciplinaCardProps) {

    async function handleMatricula(){
        try{
            await matricular(disciplina.id)

            onFeedback({
                type: 'success',
                title: 'Matrícula realizada',
                message: `Você foi matriculado em ${disciplina.name}`
            })


             await onMatriculaRealizada()

        } catch (error: unknown){

            const mensagem = GetErrorMensage(error,'Não foi possível realizar a matrícula.')

            const texto = mensagem.toLowerCase()

            let tipo: FeedbackData['type'] = 'error'
            let titulo = 'Não foi possível realizar a matrícula'

            if (
                texto.includes('pre-requisito') ||
                texto.includes('pre requisito') ||
                texto.includes('requisito nao concluido') ||
                texto.includes('materia dependente')
            ) {

                tipo = 'prerequisite'
                titulo = 'Pré-requisito não concluído'

            } else if (
                texto.includes('limite') ||
                texto.includes('24 creditos') ||
                texto.includes('creditos excedido') ||
                texto.includes('ultrapassar 24')
            ) {

                tipo = 'creditLimit'
                titulo = 'Limite de créditos atingido'

            } else if (
                texto.includes('conflito') ||
                texto.includes('mesmo horario') ||
                texto.includes('conflito de horario')
            ) {

                tipo = 'scheduleConflict'
                titulo = 'Conflito de horário'

            }

            onFeedback({
                type: tipo,
                title: titulo,
                message: mensagem
            })
        }
    }


    const vagas =
        disciplina.vagasDisponiveis ??
        disciplina.vagas ??
        0

    return (
        <div className="
      bg-white
      border
      border-ui-border
      rounded-xl
      p-5
      flex
      flex-col
      gap-4
      shadow-sm
    ">

            {/* Código e vagas */}
            <div className="flex items-center justify-between gap-3">

        <span className="
          bg-gray-100
          text-gray-600
          text-xs
          font-medium
          px-2
          py-1
          rounded-md
        ">
          {disciplina.code}
        </span>

                <span className="
          bg-brand-light
          text-brand-primary
          text-xs
          font-medium
          px-2
          py-1
          rounded-full
        ">
          {vagas} vagas restantes
        </span>

            </div>


            {/* Nome */}
            <h2 className="
        text-lg
        font-semibold
        text-gray-900
      ">
                {disciplina.name}
            </h2>


            {/* Créditos */}
            <div className="
        text-sm
        text-gray-500
      ">
                {disciplina.credits} Créditos
            </div>

            {/* Horários */}
            <div className="mt-3">

    <span className="text-xs font-semibold text-ui-medium">
        Horários
    </span>

                <div className="mt-2 flex flex-wrap gap-2">

                    {disciplina.horarios.map((horario) => (
                        <span
                            key={horario}
                            className="
                    px-2
                    py-1
                    rounded-md
                    bg-ui-bg
                    text-xs
                    text-ui-medium
                "
                        >
                {formatarHorario(horario)}
            </span>
                    ))}

                </div>

            </div>


            {/* Pré-requisitos */}
            <div>

                {disciplina.prerequisitos.length > 0 ? (

                    <span className="
            inline-block
            bg-orange-50
            border
            border-orange-200
            text-orange-700
            text-xs
            px-2
            py-1
            rounded-md
          ">
            Pré-requisito: {
                        disciplina.prerequisitos.join(', ')
                    }
          </span>

                ) : (

                    <span className="
            inline-block
            bg-gray-100
            text-gray-600
            text-xs
            px-2
            py-1
            rounded-md
          ">
            Sem pré-requisitos
          </span>

                )}

            </div>

            <button
                type="button"
                onClick={() =>
                    onVerDetalhes(disciplina)
                }
                className="
            w-full
            border
            border-brand-primary
            text-brand-primary
            text-sm
            font-medium
            py-2
            rounded-lg
            hover:bg-brand-light
            transition-colors
          "
            >
                Ver detalhes
            </button>


            {/* Status / botão */}
            {disciplina.status === 'DISPONIVEL' && (

                <button
                    onClick={handleMatricula}
                    className="
          w-full
          bg-brand-primary
          text-white
          text-sm
          font-medium
          py-2
          rounded-lg
          hover:bg-indigo-700
        ">
                    Inscrever-se
                </button>

            )}


            {disciplina.status === 'INDISPONIVEL' && (

                <button
                    type="button"
                    onClick={handleMatricula}
                    className="
            w-full
            bg-gray-200
            text-gray-500
            text-sm
            font-medium
            py-2
            rounded-lg
            cursor-not-allowed
          "
                >
                    Bloqueado
                </button>

            )}


            {disciplina.status === 'INSCRITA' && (

                <button
                    disabled
                    className="
            w-full
            bg-indigo-50
            border
            border-indigo-200
            text-brand-primary
            text-sm
            font-medium
            py-2
            rounded-lg
          "
                >
                    ✓ Inscrito
                </button>

            )}


            {disciplina.status === 'CONCLUIDA' && (

                <button
                    disabled
                    className="
            w-full
            bg-green-50
            text-green-700
            text-sm
            font-medium
            py-2
            rounded-lg
          "
                >
                    ✓ Concluída
                </button>

            )}


            {disciplina.status === 'REPROVADA' && (

                <button
                    disabled
                    className="
            w-full
            bg-red-50
            text-red-700
            text-sm
            font-medium
            py-2
            rounded-lg
          "
                >
                    Reprovada
                </button>

            )}

        </div>
    )
}