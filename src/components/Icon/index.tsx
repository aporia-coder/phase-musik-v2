import { cn } from '@/utils'
import { Icons } from './Icons'
import { IconProps } from './types'

const getViewbox = (icon: Icons) =>
  ({
    [Icons.headphones]: '0 0 512 512',
  })[icon]

export const Icon = ({ icon, fill, size, className }: IconProps) => {
  return (
    <div className={cn(`flex w-${size ?? '5'} h-${size ?? '5'}`)}>
      <svg xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          // fillRule="evenodd"
          // clipRule="evenodd"
          fill={fill}
          d={icon}
          viewBox={getViewbox(icon)}
        />
      </svg>
    </div>
  )
}
