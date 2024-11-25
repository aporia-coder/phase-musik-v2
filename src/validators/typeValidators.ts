import { z } from 'zod'
import { UppercaseFirst } from '../utils/UppercaseFirst'

export const StringValidator = (value: string) =>
  z.string().min(1, {
    message: `${UppercaseFirst(value)} is required`,
  })

export const URLValidator = () =>
  z.string().url({
    message: 'URL must point to a valid file',
  })
