import type { Disciplina } from '../types/Disciplina'
import {matricular} from "../services/MatriculaServices";

interface DisciplinaCardProps {
    disciplina: Disciplina
    onMatriculaRealizada: () => void
}

export default function DisciplinaCard({disciplina,onMatriculaRealizada}: DisciplinaCardProps) {

    async function handleMatricula(){
        try{
            await matricular(disciplina.id)

            console.log('Matrícula realizada com sucesso')

            onMatriculaRealizada()
        } catch (error){

            console.error('Erro ao realizar a matrícula:',error)
        }
    }


    const vagas =
        disciplina.vagasDisponiveis ??
        disciplina.vagas ??
        0
    function formatarHorario(horario: string) {

        return horario
            .replace('MONDAY', 'Segunda-feira')
            .replace('TUESDAY', 'Terça-feira')
            .replace('WEDNESDAY', 'Quarta-feira')
            .replace('THURSDAY', 'Quinta-feira')
            .replace('FRIDAY', 'Sexta-feira')
            .replace('SATURDAY', 'Sábado')
            .replace('SUNDAY', 'Domingo')
    }
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
                    disabled
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