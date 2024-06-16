'use client'

import { Song } from '@/components/Song'
import { music } from '@/utils'
import { useState } from 'react'

export default function HomePage() {
  const [songs] = useState(music())
  return (
    <Song
      artist={songs[0].artist}
      cover={songs[0].cover}
      name={songs[0].name}
      key={songs[0].id}
    />
  )
}
