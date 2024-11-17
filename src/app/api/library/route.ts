import { prisma } from '@/lib/client'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    const body = await req.json()

    if (!user) return new Response('Unauthorized', { status: 401 })

    const { artist, audioUrl, coverUrl, name } = body

    // can get rid of this by using the parse method with zod
    if (!artist || !audioUrl || !coverUrl || !name) {
      return new Response('Missing data', { status: 400 })
    }

    await prisma.song.create({
      data: {
        audioUrl,
        coverUrl,
        artist,
        name,
      },
    })

    return Response.json({ success: true, status: 201 })
  } catch (error) {
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
