import { OurFileRouter } from '@/app/api/uploadthing/core'
import {
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react'

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()

export const UppercaseFirst = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
