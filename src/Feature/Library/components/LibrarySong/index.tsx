import { Song } from '@prisma/client'
import Image from 'next/image'

export const LibrarySong = ({ song }: { song: Song }) => {
  return (
    <div className="cursor-pointer p-4 flex justify-between items-center hover:bg-[#8264FF19]">
      <Image src={song.coverUrl} alt={song.name} width={150} height={150} />
      <div>
        <p className="font-bold">{song.name}</p>
        <p>{song.artist}</p>
      </div>
    </div>
  )
}
