import { Suspense, lazy } from 'react'
import { Modals } from './types'
import { Dialog } from '@/components/ui/dialog'
import { useModalStore } from './store'
import { FallbackLoading } from './components/FallbackLoading'

const AutoSuccessModal = lazy(
  () => import('../../Feature/Modal/components/AutoSuccessModal')
)
const AutoErrorModal = lazy(
  () => import('../../Feature/Modal/components/AutoErrorModal')
)
const UploadSongModal = lazy(
  () => import('../Library/components/UploadSongModal')
)

const DeleteSongModal = lazy(
  () => import('../Library/components/DeleteSongModal')
)

const getModal = (modal: Modals) =>
  ({
    [Modals.UPLOAD_SONG]: <UploadSongModal />,
    [Modals.AUTO_SUCCESS]: <AutoSuccessModal />,
    [Modals.AUTO_ERROR]: <AutoErrorModal />,
    [Modals.DELETE_SONG]: <DeleteSongModal />,
  })[modal]

export const ModalHandler = ({ modal }: { modal: Modals }) => {
  return (
    <Dialog open>
      <Suspense fallback={<FallbackLoading />}>{getModal(modal)}</Suspense>
    </Dialog>
  )
}

export const ModalController = () => {
  const modals = useModalStore((state) => state.modals)

  return (
    <>
      {modals.map((modal) => (
        <ModalHandler modal={modal} key={modal} />
      ))}
    </>
  )
}
