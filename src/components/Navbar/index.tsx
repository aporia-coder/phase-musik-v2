import { Logo } from '../Logo'
import { Button } from '../ui/button'
import { Headphones } from 'lucide-react'

export const Navbar = () => {
  return (
    <nav className="flex justify-around items-center py-1">
      <Logo />
      <Button
        variant="outline"
        className="transition ease-in-out text-1xl font-semibold"
      >
        <Headphones className="mr-1" /> Library
      </Button>
    </nav>
  )
}
