    import type { FeedbackData,FeedbackType} from "../types/FeedbackType.ts";

    interface FeedbackBannerProps extends FeedbackData{
        onClose: () => void
    }

    interface FeedbackStyle {
        container: string
        icon : string
        title : string
        message :string
        symbol : string
    }

    const feedbackStyle: Record<FeedbackType, FeedbackStyle> = {
        success: {
            container: 'bg-green-50 border-green-300',
            icon: 'bg-green-600 text-white',
            title: 'text-green-900',
            message: 'text-green-700',
            symbol: '✓'
        },

        prerequisite: {
            container: 'bg-red-50 border-red-300',
            icon: 'bg-red-600 text-white',
            title: 'text-red-900',
            message: 'text-red-700',
            symbol: '!'
        },

        creditLimit: {
            container: 'bg-orange-50 border-orange-300',
            icon: 'bg-orange-500 text-white',
            title: 'text-orange-900',
            message: 'text-orange-700',
            symbol: '!'
        },

        scheduleConflict: {
            container: 'bg-yellow-50 border-yellow-300',
            icon: 'bg-yellow-500 text-white',
            title: 'text-yellow-900',
            message: 'text-yellow-700',
            symbol: '!'
        },

        error: {
            container: 'bg-red-50 border-red-300',
            icon: 'bg-red-600 text-white',
            title: 'text-red-900',
            message: 'text-red-700',
            symbol: '!'
        },
        
    }

        export default function FeedbackBanner({type,title,message,onClose}:FeedbackBannerProps){

        const style = feedbackStyle[type]

            return (

                <div
                role="alert"
                className={`
                border
                rounded-xl
                p-4
                flex
                items-start
                gap-4
                ${style.container}
              `}
            >

                <div
                    className={`
                  w-6
                  h-6
                  rounded-full
                  flex
                  items-center
                  justify-center
                  shrink-0
                  text-sm
                  font-bold
                  ${style.icon}
        `}
                >
                    {style.symbol}
                </div>

                <div className="flex-1">

                    <h2
                        className={`
            text-sm
            font-semibold
            ${style.title}
          `}
                    >
                        {title}
                    </h2>

                    <p
                        className={`
            mt-1
            text-sm
            leading-relaxed
            ${style.message}
          `}
                    >
                        {message}
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar notificação"
                    className={`
          text-xl
          leading-none
          opacity-60
          hover:opacity-100
          ${style.title}
        `}
                >
                    ×
                </button>

            </div>
        )
        }


