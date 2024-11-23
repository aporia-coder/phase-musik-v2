import { Song } from '@prisma/client'
import Image from 'next/image'
import { ActionTooltip } from '../../../../components/ActionTooltip'
import { Trash } from 'lucide-react'
import { useModalStore } from '../../../Modal/store'
import { Modals } from '../../../Modal/types'

export const LibrarySong = ({ song }: { song: Song }) => {
  const { openModal } = useModalStore()

  return (
    <div className="group cursor-pointer p-4 flex justify-between items-center hover:bg-[#8264FF19]">
      <Image src={song.coverUrl} alt={song.name} width={150} height={150} />
      <div>
        <p className="font-bold">{song.name}</p>
        <p>{song.artist}</p>
      </div>
      <ActionTooltip label="Delete">
        <Trash
          className="hidden group-hover:flex self-start text-zinc-500 hover:text-zinc-400 w-4 h-4"
          onClick={() => openModal(Modals.DELETE_SONG, song)}
        />
      </ActionTooltip>
    </div>
  )
}
