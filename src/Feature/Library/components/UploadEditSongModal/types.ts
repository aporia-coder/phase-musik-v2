import { Song } from '@prisma/client'

export interface UploadEditSongMeta {
  song: Song
  isEdit: boolean
}
