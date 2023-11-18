import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { OrderType } from '@/app/interface'

interface CheckoutModalProps {
    isOpen: boolean,
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,  
      setCheckoutDetail: React.Dispatch<React.SetStateAction<OrderType | null>>,
       checkoutDetails: OrderType | null
}

function CheckoutModal({isOpen, setIsOpen, setCheckoutDetail, checkoutDetails} : CheckoutModalProps) {
//   let [isOpen, setIsOpen] = useState(true)

  return (
    <Transition appear show={isOpen} as={Fragment}>
<Dialog as="div" className="relative  z-[100]" onClose={()=> null}>
<Transition.Child
  as={Fragment}
  enter="ease-out duration-300"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="ease-in duration-200"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
  <div className="fixed inset-0 bg-black bg-opacity-40   backdrop-blur-md  " />
</Transition.Child>


<Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >

<Dialog.Panel className="panel w-full transform overflow-y-auto rounded-2xl  bg-white p-2 text-left align-middle shadow-xl transition-all md:w-[60%] sm:w-[90%] sm:h-[80%]  md:max-w-md md:h-[400px]  z-[100]  flex flex-col fixed md:bottom-[20%] md:left-[25%] sm:bottom-[10%] sm:left-[5%] ">  
      <Dialog.Title
          as="div"
          className="flex w-full items-center"
        >
          Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
      </Transition.Child>

    </Dialog>
    </Transition>
  )
}

export default CheckoutModal
