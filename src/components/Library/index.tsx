'use client'

import { useLibrary } from '@/context/LibraryContext'
import { cn } from '@/lib/utils'
import { Song } from '@prisma/client'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { LibrarySong } from '../LibrarySong'
import { useRef } from 'react'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { Modals, useModalStore } from '../Modal/ModalController'
import { ScrollArea } from '../ui/scroll-area'
import { ActionTooltip } from '../ActionTooltip'

export const Library = ({ songs }: { songs: Song[] }) => {
  const libraryRef = useRef<HTMLDivElement>(null)
  const { libraryOpen, closeLibrary } = useLibrary()
  const { openModal } = useModalStore()

  useOnClickOutside(closeLibrary, libraryRef)

  const handleUploadClick = () => {
    openModal(Modals.UPLOAD_SONG)
    closeLibrary()
  }

  return (
    <>
      <div
        className={cn(
          `fixed top-0 left-0 bg-[#111111] z-10 py-4 w-80 h-full overflow-y-scroll transition duration-500 ease-in-out shadow `,
          libraryOpen ? 'transform translate-x-0' : '-translate-x-[110%]'
        )}
        ref={libraryRef}
      >
        <div className="flex justify-between items-center px-4 mb-4">
          <h4 className="capitalize text-4xl font-semibold">library</h4>
          <ActionTooltip label="Upload">
            <Button
              variant="outline"
              className="transition ease-in-out"
              size="sm"
              onClick={handleUploadClick}
            >
              <Plus />
            </Button>
          </ActionTooltip>
        </div>
        <ScrollArea>
          {songs.map((song) => (
            <LibrarySong song={song} key={song.id} />
          ))}
        </ScrollArea>
      </div>
    </>
  )
}
