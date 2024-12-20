import Image from 'next/image'
import { SongProps } from './Song.types'

export const Song = ({ name, artist, cover }: SongProps) => {
  return (
    <div className="flex flex-col justify-center items-center my-8 gap-8">
      <div className="w-72 h-72 relative">
        <Image className="rounded-full" src={cover} alt={name} fill priority />
      </div>
      <h1 className="text-4xl font-bold" data-testid="song-name">
        {name}
      </h1>
      <h2 className="text-2xl font-semibold">{artist}</h2>
    </div>
  )
}
