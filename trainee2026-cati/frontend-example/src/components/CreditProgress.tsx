interface CreditProgressProps {
    credits: number
    maxCredits?: number
}

export default function CreditProgress({
                                           credits,
                                           maxCredits = 24
                                       }: CreditProgressProps) {

    const percentage = Math.min(
        (credits / maxCredits) * 100,
        100
    )

    return (
        <div className="w-full bg-white border border-ui-border rounded-xl p-5">

            {/* Título e quantidade */}
            <div className="flex items-center justify-between mb-3">

                <span className="text-sm font-semibold text-ui-dark">
                    Créditos do semestre
                </span>

                <span className="text-sm font-medium text-brand-primary">
                    {credits} / {maxCredits} créditos
                </span>

            </div>

            {/* Fundo da barra */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                {/* Parte preenchida */}
                <div
                    className="h-full bg-brand-accent rounded-full transition-all duration-500"
                    style={{
                        width: `${percentage}%`
                    }}
                />

            </div>

        </div>
    )
}