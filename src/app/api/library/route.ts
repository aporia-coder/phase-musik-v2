import { prisma } from '@/lib/client'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const user = await currentUser()

    if (!user) return new NextResponse('Unauthorized', { status: 401 })

    const { artist, audioUrl, coverUrl, name } = await req.json()

    if (!artist || !audioUrl || !coverUrl || !name) {
      return new NextResponse('Missing data', { status: 400 })
    }

    const song = await prisma.song.create({
      data: {
        audioUrl,
        coverUrl,
        artist,
        name,
      },
    })

    return NextResponse.json({ song }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
