import { FormEvent,useState } from 'react'
import { GraduationCapIcon, EyeOffIcon } from '../assets/icons'
import InputField from './InputField'
import { Page } from '../types'
import {cadastrarAluno} from "../services/AlunoServices";

interface SignupCardProps {
  onNavigate?: (page: Page) => void
}

export default function SignupCard({ onNavigate }: SignupCardProps) {
  const [showPassword, setShowPassword] = useState(false)

  //dados do formulário:
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmPassword] = useState('')
  const[error,setError] = useState('')
  const[success,setSuccess] = useState('')
  const[loading,setLoading] = useState(false) //impede vários cliques enquanto cadastra

  async function handleSubmit(event: FormEvent<HTMLFormElement>){

    event.preventDefault() //impede o navegador de recarregar a página

    setError('') //limpa o erro antigo
    setSuccess('') //limpa o sucesso antigo

    if (
        !name ||
        !email ||
        !password ||
        !confirmPassword){

      setError('Preencha todos os campos')
      return
    }

      if(password.length< 10){
        setError('A senha deve possuir pelo menos 10 caracteres') //backend pede isso
        return
      }

      if(password !== confirmPassword){
        setError('As senhas não coincidem')
        return
      }

      try{

        setLoading(true)

        await cadastrarAluno({name,email,password})

        setSuccess('Usuário cadastrado com sucesso!!')

        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('') //limpa os campos

        //Espera para o usuário ver a mensagem
        setTimeout(() => {
          onNavigate?.('login')
        }, 300)


    } catch(error){

        console.error('Erro ao cadastrar usuário:',error)

        setError('Não foi possível criar a conta,tente novamente.')

      } finally {

        setLoading(false)

      }
  }


  return (
    <div className="bg-white border border-[rgba(199,196,216,0.4)] rounded-2xl shadow-[0px_25px_50px_-12px_rgba(79,70,229,0.05)] flex flex-col gap-8 p-6 sm:p-[41px]">
      {/*cabeçalho*/}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <div className="bg-[rgba(79,70,229,0.1)] border border-[rgba(79,70,229,0.1)] flex items-center justify-center w-14 h-14 rounded-xl shadow-sm p-px">
            <GraduationCapIcon width={29} height={24} color="#4f46e5" />
          </div>
        </div>

        <h2 className="font-semibold text-[20px] text-brand-accent tracking-[-0.5px] leading-7 text-center mb-1">
          MatriculaFácil
        </h2>

        <h1 className="font-bold text-[28px] sm:text-[32px] text-ui-dark tracking-[-0.64px] leading-tight text-center mb-2">
          Criar Conta
        </h1>

        <p className="font-normal text-base text-ui-medium leading-6 text-center max-w-[320px]">
          Preencha os dados abaixo para iniciar sua jornada acadêmica.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full"
      >
        {/*nome*/}
        <InputField
          label="Nome Completo"
          type="text"
          placeholder="Ex: João da Silva"
          value={name}
          onChange={(event) => setName((event.target.value))}
        />

        {/*email*/}
        <InputField
          label="E-mail Institucional"
          type="email"
          placeholder="joao.silva@aluno.edu.br"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {/*senha*/}
        <InputField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="flex items-center justify-center"
            >
              <EyeOffIcon />
            </button>
          }
        />
        {/*Confirmar senha*/}
        <div className="pb-2">
          <InputField
            label="Confirmar Senha"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>

        {/* Erro */}
        {error && (
            <div className="
            bg-red-50
            border
            border-red-200
            text-red-700
            text-sm
            px-4
            py-3
            rounded-lg
            text-center
  ">
              {error}
            </div>
        )}

        {success && (
            <p className="
            bg-green-50
             border
             border-green-200
             text-green-700
             text-sm
             px-4
             py-3
             rounded-lg
             text-center
  ">
              {success}
            </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-accent text-white font-normal text-base leading-6 py-[14px] rounded-lg shadow-[0px_4px_6px_-1px_rgba(79,70,229,0.2),0px_2px_4px_-2px_rgba(79,70,229,0.2)] hover:bg-indigo-700 active:bg-indigo-800 transition-colors  disabled:opacity-50
            disabled:cursor-not-allowed"
        >
          {loading
              ? 'Criando conta...'
              : 'Criar Conta'
          }

        </button>
      </form>

        {/*Voltar para o login*/}
      <div className="pt-2">
        <div className="border-t border-[rgba(199,196,216,0.2)] pt-6 w-full">
          <div className="flex items-center justify-center gap-1">
            <span className="font-normal text-[15px] text-ui-medium leading-[22.5px]">
              Já tem uma conta?
            </span>
            <button
              type="button"
              onClick={() => onNavigate?.('login')}
              className="font-medium text-[15px] text-brand-accent leading-[22.5px] hover:underline"
            >
              Entre
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}