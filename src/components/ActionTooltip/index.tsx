import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { ActionTooltipProps, TooltipAlign, TooltipSide } from './types'

export const ActionTooltip = ({
  children,
  side = TooltipSide.TOP,
  align = TooltipAlign.CENTER,
  label,
  labelClassName,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className={labelClassName}>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
