'use client'

import Image from 'next/image'
import { Button } from '../../../../components/ui/button'
import { BaseModal } from '../../../Modal/components/BaseModal'
import { useModalStore } from '../../../Modal/store'
import { Modals } from '../../../Modal/types'
import axios from 'axios'
import { useModalSuccess } from '../../../../hooks/useModalSuccesss'
import { useState } from 'react'

const DeleteSongModal = () => {
  const { getModalMeta, closeModal } = useModalStore()
  const [loading, setLoading] = useState(false)
  const song = getModalMeta(Modals.DELETE_SONG)
  const modalSuccess = useModalSuccess()

  const deleteSong = async () => {
    try {
      setLoading(true)
      await axios.patch(`/api/library`, song?.id)
      modalSuccess()
      setLoading(false)
    } catch (error) {
      console.log({ error })
    }
  }

  const buttons = (
    <>
      <Button onClick={() => closeModal()}>Close</Button>
      <Button variant={'destructive'} onClick={deleteSong} disabled={loading}>
        {loading ? 'Please wait....' : 'Confirm'}
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
