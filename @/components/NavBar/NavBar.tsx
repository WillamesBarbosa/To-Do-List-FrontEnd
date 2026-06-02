import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogOut, User } from 'lucide-react'
import api from '@/services/api'
import { removeTokens } from '@/services/auth'
import { CreateTaskModal } from '../CreateTaskModal/CreateTaskModal'


export function Navbar() {
  const navigate = useNavigate()

  async function handleLogout(){
    try {
      await api.post('/logout')
    } finally {
      removeTokens()
      navigate('/')
    }

  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="55" fill="none" stroke="#7c3aed" strokeWidth="14" strokeLinecap="round"
              strokeDasharray="300"
              strokeDashoffset="60"
              transform="rotate(-45 80 80)"
            />
          </svg>
          <span className="text-xl font-semibold text-foreground tracking-widest">KRON</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            onClick={() => navigate('/profile')}
          >
            <User className="mr-2 h-4 w-4" />
            Perfil
          </Button>
          <CreateTaskModal/>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </nav>
)
}