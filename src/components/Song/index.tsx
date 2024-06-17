import { SongType } from '@/globals/types'
import Image from 'next/image'

export const Song = ({ name, artist, cover }: SongType) => {
  return (
    <div className="flex flex-col justify-center items-center my-8 gap-8">
      <div className="w-72 h-72 relative">
        <Image className="rounded-full" src={cover} alt={name} fill={true} />
      </div>
      <h1 className="text-4xl font-bold">{name}</h1>
      <h2 className="text-2xl font-semibold">{artist}</h2>
    </div>
  )
}
