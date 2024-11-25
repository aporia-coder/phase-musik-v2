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

const UploadEditSongModal = () => {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)
  const { closeModal, openModal, getModalMeta } = useModalStore()
  const meta = getModalMeta(Modals.UPLOAD_EDIT_SONG)
  const modalSuccess = useModalSuccess()

  const [imageUrl, setImageUrl] = useState<string | undefined>(
    meta?.song.coverUrl
  )
  const [songName, setSongName] = useState<string | undefined>(meta?.song.name)

  const isEdit = meta?.isEdit

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
      name: isEdit ? meta.song.name : '',
      artist: isEdit ? meta.song.artist : '',
      coverUrl: isEdit ? meta.song.coverUrl : '',
      audioUrl: isEdit ? meta.song.audioUrl : '',
    },
  })

  const onCreateSubmit = async (values: SongPayload) => {
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

  const onEditSubmit = async (values: SongPayload) => {
    try {
      await axios.patch('/api/library', {
        ...values,
        id: meta?.song.id,
      })
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

  const onSubmit = isEdit ? onEditSubmit : onCreateSubmit

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
      1: `${isEdit ? 'Edit' : 'Upload'} Song Details`,
      2: `${isEdit ? 'Edit' : 'Upload'} Image`,
      3: `${isEdit ? 'Edit' : 'Upload'} Song`,
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

export default UploadEditSongModal
