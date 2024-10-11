import { useState } from 'react'
import { BaseModal } from '../BaseModal'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const UploadSongModal = () => {
  const [step, setStep] = useState<number>(1)

  const decrementStep = () => setStep((prevStep) => prevStep - 1)
  const incrementStep = () => setStep((prevStep) => prevStep + 1)

  const formSchema = z.object({
    name: z.string().min(1, {
      message: 'Song name is required',
    }),
    artist: z.string().min(1, {
      message: 'Artist name is required',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      artist: '',
    },
  })

  const modalHeader = 'Upload Song'

  const getModalDescription = () =>
    ({
      1: 'Enter the artist and song names',
      2: 'Upload your album art',
    })[step]

  const getModalButtons = () =>
    ({
      1: () => <Button onClick={incrementStep}>Next</Button>,
      2: () => (
        <>
          <Button onClick={decrementStep}>Back</Button>
          <Button>Upload Image</Button>
        </>
      ),
      3: () => (
        <>
          <Button onClick={decrementStep}>Back</Button>
          <Button>Upload Song</Button>
        </>
      ),
    })[step]

  const modalDescription = getModalDescription()
  const modalButtons = getModalButtons()

  return (
    modalButtons && (
      <BaseModal
        title={modalHeader}
        buttons={modalButtons()}
        description={modalDescription}
      />
    )
  )
}

export default UploadSongModal
