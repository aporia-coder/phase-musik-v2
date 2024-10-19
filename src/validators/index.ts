import { z } from 'zod'

export const SongValidator = z.object({
  name: z.string().min(1, {
    message: 'Song name is required',
  }),
  artist: z.string().min(1, {
    message: 'Artist name is required',
  }),
  coverUrl: z.string().url({
    message: 'URL must point to a valid file',
  }),
  audioUrl: z.string().url({
    message: 'URL must point to a valid file',
  }),
})

export type SongPayload = z.infer<typeof SongValidator>
