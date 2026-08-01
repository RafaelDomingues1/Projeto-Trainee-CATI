interface SearchBarProps{
    value: string
    onChange: (value: string) => void
}

export default function SearchBar({
    value,onChange
}:SearchBarProps) {

    return (
        <div className="relative w-full">

      <span
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-ui-muted
          pointer-events-none
        "
      >
        🔍
      </span>

            <input
                type="text"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder="Buscar disciplina por nome ou código..."
                className="
          w-full
          bg-white
          border
          border-ui-border
          rounded-xl
          py-3
          pl-11
          pr-10
          text-sm
          text-ui-dark
          outline-none
          transition-colors
          focus:border-brand-primary
          focus:ring-2
          focus:ring-brand-light
        "
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    aria-label="Limpar pesquisa"
                    className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-ui-muted
            hover:text-ui-dark
            text-xl
            leading-none
          "
                >
                    ×
                </button>
            )}

        </div>
    )
}

