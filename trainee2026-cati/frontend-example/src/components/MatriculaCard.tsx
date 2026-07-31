import type {Disciplina} from '../types/Disciplina'

interface MatriculaCardProps{
    disciplina: Disciplina
    onCancelar: (disciplinaId:string) => void
}

export default function MatriculaCard({disciplina,onCancelar}:MatriculaCardProps){

    function FormataHorario(horario:string) {
        return horario
            .replace('MONDAY','Segunda-feira')
            .replace('TUESDAY', 'Terça-feira')
            .replace('WEDNESDAY', 'Quarta-feira')
            .replace('THURSDAY', 'Quinta-feira')
            .replace('FRIDAY', 'Sexta-feira')
            .replace('SATURDAY', 'Sábado')
            .replace('SUNDAY', 'Domingo')
    }


    return (

        <div
            className="
        bg-white
        border
        border-ui-border
        rounded-xl
        p-5
        shadow-sm
        flex
        flex-col
        gap-4
      "
        >

            <div className="flex items-center justify-between gap-3">

        <span
            className="
            bg-gray-100
            text-gray-600
            text-xs
            font-medium
            px-2
            py-1
            rounded-md
          "
        >
          {disciplina.code}
        </span>

                <span
                    className="
            bg-indigo-50
            text-brand-primary
            text-xs
            font-medium
            px-3
            py-1
            rounded-full
          "
                >
          Inscrita
        </span>

            </div>

            <h2 className="text-lg font-semibold text-gray-900">
                {disciplina.name}
            </h2>

            <p className="text-sm text-gray-500">
                {disciplina.credits} Créditos
            </p>

            <div>

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
              {FormataHorario(horario)}
            </span>
                    ))}

                </div>

            </div>

            <button
                type="button"
                onClick={() => onCancelar(disciplina.id)} //envia o UUID da disciplina para a página
                className="
          w-full
          border
          border-red-200
          text-red-600
          text-sm
          font-medium
          py-2
          rounded-lg
          hover:bg-red-50
          transition-colors
        "
            >
                Cancelar matrícula
            </button>

        </div>
    )
}