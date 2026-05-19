import { Button } from '../ui/button'
import { LogOut, LayoutGrid } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <LayoutGrid className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">TaskFlow</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
          onClick={() => {}}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </nav>
  )
}