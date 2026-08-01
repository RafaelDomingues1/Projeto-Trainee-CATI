import axios from 'axios'

interface BackendError {
    message?: string
    error?: string
    field?: string | null
}

export function GetErrorMensage(
    error:unknown,
    fallback: string
): string {

    if(!axios.isAxiosError<BackendError>(error)){
        return fallback
    }

    const resposta = error.response?.data

    if(typeof resposta === 'string'){
         return resposta
    }

    if(resposta && typeof resposta === 'object'){
        
        return (
            resposta.message ??
                resposta.error ??
                fallback
        )
    }
    return fallback
}