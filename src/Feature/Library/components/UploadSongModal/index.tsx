'use client'

import axios, { AxiosError } from 'axios'
import { ReactNode, useState } from 'react'
import { BaseModal } from '../../../Modal/components/BaseModal'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UploadButton } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Modals } from '../../../Modal/types'
import { useModalStore } from '@/Feature/Modal/store'
import { SongPayload, SongValidator } from '@/validators'
import { Loader } from '@/components/Loader'
import { useModalSuccess } from '../../../../hooks/useModalSuccesss'

const UploadSongModal = () => {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)
  const [songName, setSongName] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const { closeModal, openModal } = useModalStore()
  const modalSuccess = useModalSuccess()

  const decrementStep = () => setStep((prevStep) => prevStep - 1)
  const incrementStep = () => setStep((prevStep) => prevStep + 1)

  const handleStepOne = async () => {
    await form.trigger(['name', 'artist'])
    if (Object.keys(form.formState.errors).length === 0) {
      incrementStep()
    }
  }

  const handleStepTwo = () => {
    if (form.getValues('coverUrl')) {
      incrementStep()
    }
  }

  const form = useForm<SongPayload>({
    resolver: zodResolver(SongValidator),
    mode: 'onChange',
    defaultValues: {
      name: '',
      artist: '',
      coverUrl: '',
      audioUrl: '',
    },
  })

  const onSubmit = async (values: SongPayload) => {
    try {
      await axios.post('/api/library', values)
      modalSuccess()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          router.push('/sign-in')
        }
        openModal(Modals.AUTO_ERROR, { error: error.message })
      }
      console.log(error)
    }
  }

  const isLoading = form.formState.isSubmitting

  const getModalContent = (): ReactNode =>
    ({
      1: (
        <>
          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter artist name</FormLabel>
                <FormControl>
                  <Input placeholder="Artist" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter song name</FormLabel>
                <FormControl>
                  <Input placeholder="Song" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      ),
      2: (
        <>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              form.setValue('coverUrl', res[0].url)
              setImageUrl(res[0].url)
            }}
            onUploadError={(error: Error) => {
              openModal(Modals.AUTO_ERROR, { error: error.message })
            }}
          />
          {imageUrl && (
            <Image
              src={imageUrl}
              width={200}
              height={200}
              alt="Song Image"
              className="mx-auto rounded-full"
            />
          )}
        </>
      ),
      3: (
        <>
          <UploadButton
            endpoint="songUploader"
            onClientUploadComplete={(res) => {
              setSongName(res[0].name)
              form.setValue('audioUrl', res[0].url)
            }}
            onUploadError={(error: Error) => {
              closeModal()
              openModal(Modals.AUTO_ERROR, { error: error.message })
            }}
          />
          {songName && <p className="mx-auto">{songName}</p>}
        </>
      ),
    })[step]

  const getModalHeader = () =>
    ({
      1: 'Upload Song Details',
      2: 'Upload Image',
      3: 'Upload Song',
    })[step]

  const getModalDescription = () =>
    ({
      1: 'Enter the artist and song names',
      2: 'Upload your album art',
      3: 'Upload your audio file',
    })[step]

  const getModalButtons = () =>
    ({
      1: <Button onClick={handleStepOne}>Next</Button>,
      2: (
        <>
          <Button onClick={decrementStep}>Back</Button>
          <Button
            onClick={handleStepTwo}
            disabled={!form.getValues('coverUrl')}
          >
            Next
          </Button>
        </>
      ),
      3: (
        <>
          <Button onClick={decrementStep}>Back</Button>
          <Button
            type="submit"
            disabled={!songName || isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading && <Loader className="mr-2 h-4 w-4" />}
            {isLoading ? 'Please wait' : 'Submit'}
          </Button>
        </>
      ),
    })[step]

  const modalDescription = getModalDescription()
  const modalButtons = getModalButtons()
  const modalContent = getModalContent()
  const modalHeader = getModalHeader() as string

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <BaseModal
          title={modalHeader}
          buttons={modalButtons}
          description={modalDescription}
          content={modalContent}
        />
      </form>
    </Form>
  )
}

export default UploadSongModal
