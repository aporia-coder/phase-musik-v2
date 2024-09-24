import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Logo } from '../Logo'
import { Button } from '../ui/button'
import { Headphones } from 'lucide-react'
import Link from 'next/link'
import { useLibrary } from '@/context/LibraryContext'

export const Navbar = () => {
  const { toggleLibraryOpen } = useLibrary()

  return (
    <nav className="flex justify-around items-center py-1">
      <Logo />
      <div className="flex gap-4">
        <SignedOut>
          <Link href="sign-in" passHref>
            <Button
              variant="outline"
              className="transition ease-in-out text-1xl font-semibold"
            >
              Sign In
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Button
            variant="outline"
            className="transition ease-in-out text-1xl font-semibold"
            onClick={toggleLibraryOpen}
          >
            <Headphones className="mr-1" /> Library
          </Button>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}
