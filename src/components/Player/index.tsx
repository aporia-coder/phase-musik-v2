import { StepBack } from 'lucide-react'
import { StepForward } from 'lucide-react'
import { Slider } from '../Slider'

export const Player = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-1/2">
        <Slider />
        <StepBack fill="#FFF" size={35} />
        <StepForward fill="#FFF" size={35} />
      </div>
    </div>
  )
}
