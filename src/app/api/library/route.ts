import { prisma } from '@/lib/client'
import { currentUser } from '@clerk/nextjs/server'
import { SongValidator } from '../../../validators'

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    const body = await req.json()

    if (!user) return new Response('Unauthorized', { status: 401 })

    const { artist, audioUrl, coverUrl, name } =
      await SongValidator.parseAsync(body)

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
    return new Response('Internal server error', { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await currentUser()
    const body = await req.json()

    if (!user) return new Response('Unauthorized', { status: 401 })
    if (!body) return new Response('Bad Request', { status: 400 })

    const { artist, audioUrl, coverUrl, name, id } = SongValidator.parse(body)

    await prisma.song.update({
      where: {
        id: Number(id),
      },
      data: {
        id: Number(id),
        artist,
        audioUrl,
        coverUrl,
        name,
      },
    })

    return Response.json({ success: true, status: 200 })
  } catch (error) {
    console.log({ error })
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await currentUser()
    const { song } = await req.json()
    if (!user) return new Response('Unauthorized', { status: 401 })
    if (!song) return new Response('Bad Request', { status: 400 })

    SongValidator.parse(song)

    await prisma.song.delete({
      where: {
        id: song.id,
      },
    })

    return new Response('Success', { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}
