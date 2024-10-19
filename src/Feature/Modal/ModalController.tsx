import { Suspense, lazy } from 'react'
import { Modals } from './types'
import { Dialog } from '@/components/ui/dialog'
import { useModalStore } from './store'

const AutoSuccessModal = lazy(
  () => import('../../Feature/Modal/components/AutoSuccessModal')
)
const AutoErrorModal = lazy(
  () => import('../../Feature/Modal/components/AutoErrorModal')
)
const UploadSongModal = lazy(
  () => import('../Library/components/UploadSongModal')
)

const getModal = (modal: Modals) =>
  ({
    [Modals.UPLOAD_SONG]: <UploadSongModal />,
    [Modals.AUTO_SUCCESS]: <AutoSuccessModal />,
    [Modals.AUTO_ERROR]: <AutoErrorModal />,
  })[modal]

export const ModalHandler = ({ modal }: { modal: Modals }) => {
  return (
    <Dialog open>
      <Suspense fallback={<div>fallback</div>}>{getModal(modal)}</Suspense>
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
