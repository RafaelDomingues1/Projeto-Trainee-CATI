import { useState } from 'react'
import { GraduationCapIcon, MenuIcon } from '../assets/icons'
import { User } from '../types'

interface DashboardHeaderProps {
  user: User
}

interface NavLink {
  label: string
  href: string
  active: boolean
}

function getInitials(name?: string) {
  if (!name) {
    return ''
  }

  const nomes = name.trim().split(' ')

  if(nomes.length === 1) {
    return nomes[0][0].toUpperCase()
  }

  const primeiraInicial = nomes[0][0]
  const ultimaInicial = nomes[nomes.length -1][0]

  return (primeiraInicial + ultimaInicial).toUpperCase()
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks: NavLink[] = [
    { label: 'Catálogo', href: '#', active: true },
  ]

  return (
    <header className="bg-white border-b border-ui-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-brand-light flex items-center justify-center w-8 h-8 rounded-lg">
              <GraduationCapIcon width={18} height={14} color="#3525cd" />
            </div>
            <span className="font-bold text-[17px] text-brand-primary tracking-tight hidden sm:block">
              MatriculaFácil
            </span>
          </div>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex justify-items-start gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  link.active
                    ? 'bg-brand-light text-brand-primary'
                    : 'text-ui-medium hover:bg-ui-bg hover:text-ui-dark',
                ].join(' ')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Usuário */}
            <div className="flex items-center gap-3">
              {/* Avatar com as iniciais */}
              <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-semibold leading-none">
                  {getInitials(user.name) || 'A'}
                </span>
              </div>
              {/* Nome e período */}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm font-semibold text-ui-dark">{user.name || 'Aluno'}</span>
                <span className="text-xs text-ui-muted mt-0.5">{user.periodo}</span>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-ui-muted hover:text-ui-dark transition-colors p-1.5 rounded-lg hover:bg-ui-bg"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-ui-border py-2 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={[
                  'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  link.active
                    ? 'bg-brand-light text-brand-primary'
                    : 'text-ui-medium hover:bg-ui-bg',
                ].join(' ')}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
