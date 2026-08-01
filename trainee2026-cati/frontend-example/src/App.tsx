import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import { Page } from './types'
import MinhasMateriaPage from "./pages/MinhasMateriaPage.tsx";
import MeuPerfilPage from "./pages/MeuPerfilPage.tsx";

export default function App() {
  const [page, setPage] = useState<Page>('login')

  if (page === 'signup') return <SignupPage onNavigate={setPage} />
  if (page === 'dashboard') return <DashboardPage onNavigate={setPage} />
  if (page === 'minhasMaterias') return <MinhasMateriaPage onNavigate={setPage}/>
  if(page === 'perfil') return<MeuPerfilPage onNavigate={setPage}/>
  return <LoginPage onNavigate={setPage} />
}
