const diasDaSemana: Record<string, string> = {
    MONDAY: 'Segunda-feira',
    TUESDAY: 'Terça-feira',
    WEDNESDAY: 'Quarta-feira',
    THURSDAY: 'Quinta-feira',
    FRIDAY: 'Sexta-feira',
    SATURDAY: 'Sábado',
    SUNDAY: 'Domingo'
}

export function formatarHorario(horario: string): string {
    let horarioFormatado = horario

    Object.entries(diasDaSemana).forEach(
        ([diaIngles, diaPortugues]) => {
            horarioFormatado = horarioFormatado.replace(
                diaIngles,
                diaPortugues
            )
        }
    )

    return horarioFormatado
}