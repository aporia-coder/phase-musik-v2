import { z } from 'zod'
import { StringValidator, URLValidator } from './typeValidators'

export const SongValidator = z.object({
  name: StringValidator('name'),
  artist: StringValidator('artist'),
  coverUrl: URLValidator(),
  audioUrl: URLValidator(),
})

export type SongPayload = z.infer<typeof SongValidator>
