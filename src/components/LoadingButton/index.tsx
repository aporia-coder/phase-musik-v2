import { Loader } from '../Loader'
import { Button } from '../ui/button'

export const LoadingButton = () => {
  return (
    <Button disabled>
      <Loader message="Please wait..." className="mr-2 h-4 w-4 " />
    </Button>
  )
}
