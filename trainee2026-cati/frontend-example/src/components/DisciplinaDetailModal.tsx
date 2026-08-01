import {useEffect} from "react";
import type {Disciplina} from "../types/Disciplina.ts";
import mockDisciplinaDetails from "../services/MockDisciplinaDetails.ts";
import {formatarHorario} from "../utils/FormatarHorario.ts";

interface DisciplinaDetailModalProps{
    disciplina: Disciplina
    onClose: () => void
}

export default function DisciplinaDetailModal({disciplina, onClose}:DisciplinaDetailModalProps){

    const detalhes = mockDisciplinaDetails[disciplina.code]

    useEffect(() => {

        function fecharcomEsc(event: KeyboardEvent){
            if(event.key === 'Escape'){onClose()}
        }

        document.addEventListener('keydown',fecharcomEsc)

        document.body.style.overflow = 'hidden'

        return() =>{

            document.removeEventListener('keydown',fecharcomEsc)

            document.body.style.overflow = ''}
    },[onClose])

    return (
        <div
            className="
        fixed
        inset-0
        z-50
        bg-black/50
        flex
        items-center
        justify-center
        p-4
      "
            onMouseDown={onClose}
        >

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-modal-disciplina"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
                className="
          bg-white
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          shadow-xl
        "
            >

                {/* Cabeçalho */}
                <div
                    className="
            flex
            items-start
            justify-between
            gap-4
            p-6
            border-b
            border-ui-border
          "
                >

                    <div>

            <span
                className="
                inline-block
                bg-brand-light
                text-brand-primary
                text-xs
                font-semibold
                px-2
                py-1
                rounded-md
                mb-3
              "
            >
              {disciplina.code}
            </span>

                        <h2
                            id="titulo-modal-disciplina"
                            className="
                text-xl
                font-bold
                text-ui-dark
              "
                        >
                            {disciplina.name}
                        </h2>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar detalhes"
                        className="
              text-2xl
              text-ui-muted
              hover:text-ui-dark
              leading-none
            "
                    >
                        ×
                    </button>

                </div>

                {/* Conteúdo */}
                <div className="p-6 space-y-6">

                    <div
                        className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
            "
                    >

                        <div
                            className="
                bg-ui-bg
                rounded-xl
                p-4
              "
                        >
              <span className="text-xs text-ui-muted">
                Professor
              </span>

                            <p className="mt-1 font-semibold text-ui-dark">
                                {detalhes?.professor ??
                                    'Professor não informado'}
                            </p>
                        </div>

                        <div
                            className="
                bg-ui-bg
                rounded-xl
                p-4
              "
                        >
              <span className="text-xs text-ui-muted">
                Créditos
              </span>

                            <p className="mt-1 font-semibold text-ui-dark">
                                {disciplina.credits} créditos
                            </p>
                        </div>

                    </div>

                    {/* Descrição */}
                    <section>

                        <h3 className="font-semibold text-ui-dark">
                            Descrição da disciplina
                        </h3>

                        <p
                            className="
                mt-2
                text-sm
                text-ui-medium
                leading-relaxed
              "
                        >
                            {detalhes?.description ??
                                'Descrição ainda não cadastrada.'}
                        </p>

                    </section>

                    {/* Horários */}
                    <section>

                        <h3 className="font-semibold text-ui-dark">
                            Horários
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-2">

                            {disciplina.horarios.map(
                                (horario) => (

                                    <span
                                        key={horario}
                                        className="
                      bg-gray-100
                      text-gray-700
                      text-xs
                      px-3
                      py-1.5
                      rounded-lg
                    "
                                    >
                    {formatarHorario(horario)}
                  </span>

                                )
                            )}

                        </div>

                    </section>

                    {/* Pré-requisitos */}
                    <section>

                        <h3 className="font-semibold text-ui-dark">
                            Pré-requisitos
                        </h3>

                        {detalhes?.prerequisitos.length ? (

                            <div className="mt-3 space-y-3">

                                {detalhes.prerequisitos.map(
                                    (prerequisito) => (

                                        <div
                                            key={prerequisito.code}
                                            className="
                        border
                        border-orange-200
                        bg-orange-50
                        rounded-xl
                        p-4
                      "
                                        >

                                            <div
                                                className="
                          flex
                          items-center
                          gap-2
                          flex-wrap
                        "
                                            >

                        <span
                            className="
                            bg-orange-200
                            text-orange-800
                            text-xs
                            font-semibold
                            px-2
                            py-1
                            rounded-md
                          "
                        >
                          {prerequisito.code}
                        </span>

                                                <span
                                                    className="
                            font-semibold
                            text-orange-900
                          "
                                                >
                          {prerequisito.name}
                        </span>

                                            </div>

                                            <p
                                                className="
                          mt-2
                          text-sm
                          text-orange-700
                        "
                                            >
                                                {prerequisito.description}
                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <div
                                className="
                  mt-3
                  bg-green-50
                  border
                  border-green-200
                  text-green-700
                  text-sm
                  rounded-xl
                  p-4
                "
                            >
                                Esta disciplina não possui pré-requisitos.
                            </div>

                        )}

                    </section>

                </div>

                {/* Rodapé */}
                <div
                    className="
            flex
            justify-end
            p-6
            border-t
            border-ui-border
          "
                >

                    <button
                        type="button"
                        onClick={onClose}
                        className="
              bg-brand-primary
              text-white
              text-sm
              font-medium
              px-5
              py-2
              rounded-lg
              hover:bg-indigo-700
            "
                    >
                        Fechar
                    </button>

                </div>

            </div>

        </div>
    )
}