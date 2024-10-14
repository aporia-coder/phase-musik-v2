'use client'

import axios from 'axios'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { BaseModal } from '../BaseModal'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
import { SongProgressValues } from './types'
import { Modals, useModalStore } from '../../ModalController'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const UploadSongModal = () => {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [songName, setSongName] = useState<string>('')
  const { closeModal, openModal } = useModalStore()

  const decrementStep = () => setStep((prevStep) => prevStep - 1)
  const incrementStep = () => setStep((prevStep) => prevStep + 1)

  const songProgress = useMemo((): SongProgressValues => {
    return {
      step: step,
      imageUrl: imageUrl,
      songName: songName,
    }
  }, [step, imageUrl, songName])

  const updateLocalStorage = useCallback(
    () => localStorage.setItem('songProgress', JSON.stringify(songProgress)),
    [songProgress]
  )

  useEffect(() => {
    updateLocalStorage()
  }, [step, updateLocalStorage])

  const handleStepOne = async () => {
    await form.trigger(['name', 'artist'])
    if (Object.keys(form.formState.errors).length === 0) {
      updateLocalStorage()
      incrementStep()
    }
  }

  const handleStepTwo = () => {
    if (imageUrl) {
      updateLocalStorage()
      incrementStep()
    }
  }

  const formSchema = z.object({
    name: z.string().min(1, {
      message: 'Song name is required',
    }),
    artist: z.string().min(1, {
      message: 'Artist name is required',
    }),
    coverUrl: z.string().url({
      message: 'URL must point to a valid file',
    }),
    audioUrl: z.string().url({
      message: 'URL must point to a valid file',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      artist: '',
      coverUrl: '',
      audioUrl: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/library', values)
      openModal(Modals.AUTO_SUCCESS)
      closeModal()
      router.refresh()
    } catch (error) {
      openModal(Modals.AUTO_ERROR)
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
              setImageUrl(res[0].url)
              form.setValue('coverUrl', res[0].url)
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
              // Do something with the error.
              alert(`ERROR! ${error.message}`)
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
      1: () => <Button onClick={handleStepOne}>Next</Button>,
      2: () => (
        <>
          <Button onClick={decrementStep}>Back</Button>
          <Button onClick={handleStepTwo} disabled={!imageUrl}>
            Next
          </Button>
        </>
      ),
      3: () => (
        <>
          <Button onClick={decrementStep}>Back</Button>
          <Button
            type="submit"
            disabled={!songName || isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Please wait' : 'Submit'}
          </Button>
        </>
      ),
    })[step]

  const modalDescription = getModalDescription()
  const modalButtons = getModalButtons()
  const modalContent = getModalContent()
  const modalHeader = getModalHeader()

  return (
    modalButtons &&
    modalContent &&
    modalHeader && (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <BaseModal
            title={modalHeader}
            buttons={modalButtons()}
            description={modalDescription}
            content={modalContent}
          />
        </form>
      </Form>
    )
  )
}

export default UploadSongModal
