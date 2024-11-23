'use client'

import Image from 'next/image'
import { Button } from '../../../../components/ui/button'
import { BaseModal } from '../../../Modal/components/BaseModal'
import { useModalStore } from '../../../Modal/store'
import { Modals } from '../../../Modal/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteSongModal = () => {
  const router = useRouter()
  const { getModalMeta, closeModal, openModal } = useModalStore()
  const song = getModalMeta(Modals.DELETE_SONG)

  const deleteSong = async () => {
    try {
      await axios.patch(`/api/library`, song?.id)
      closeModal()
      openModal(Modals.AUTO_SUCCESS)
      router.refresh()
    } catch (error) {
      console.log({ error })
    }
  }

  const buttons = (
    <>
      <Button onClick={() => closeModal()}>Close</Button>
      <Button variant={'destructive'} onClick={deleteSong}>
        Confirm
      </Button>
    </>
  )

  return (
    song && (
      <BaseModal
        title="Delete song"
        description={`Are you sure you wish to delete ${song.name}?`}
        buttons={buttons}
        content={
          <Image
            src={song.coverUrl}
            alt={song.name}
            width={200}
            height={200}
            className="mx-auto rounded-full"
          />
        }
      />
    )
  )
}

export default DeleteSongModal
