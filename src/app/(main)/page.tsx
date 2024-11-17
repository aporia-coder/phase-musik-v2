import { Song } from '@/components/Song'
import { Library } from '@/Feature/Library/Library'
import { prisma } from '@/lib/client'

const HomePage = async () => {
  const songList = await prisma.song.findMany()

  if (!songList[0]) return

  return (
    !!songList[0].artist && (
      <>
        <Song
          artist={songList[0].artist}
          cover={songList[0].coverUrl}
          name={songList[0].name}
          key={songList[0].id}
        />
        <Library songs={songList} />
      </>
    )
  )
}

export default HomePage
