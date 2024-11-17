import { ReactNode } from 'react'

export enum TooltipSide {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export enum TooltipAlign {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export interface ActionTooltipProps {
  children: ReactNode
  label: string
  labelClassName?: string
  side?: TooltipSide
  align?: TooltipAlign
}
