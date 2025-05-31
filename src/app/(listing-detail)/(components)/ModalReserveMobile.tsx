import React, { FC, Fragment, useState } from "react";
import CheckOutPagePageMain from "@/app/checkout/PageMain";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalReserveMobileProps {
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode;
  startDate?: any,
  endDate?: any,
  guestAdultsInputValue?: any,
  guestChildrenInputValue?: any,
  guestInfantsInputValue?: any,
  currentroomPrice?: any,
  numberOfRoomSelected?: any,
  daysToStay?: any,
  workationDiscount?: any,
  surgedPrice?: any,
  extraGuest?: any,
  currentActiveRoom?: any,
  convenienceFee?: any,
  gst?: any,
  roomPrice?: any,
  totalPrice?: any,
  result?: any,
}

const ModalReserveMobile: FC<ModalReserveMobileProps> = ({
  renderChildren, endDate, startDate, guestAdultsInputValue, guestChildrenInputValue, guestInfantsInputValue, currentroomPrice, numberOfRoomSelected, daysToStay,
  workationDiscount, surgedPrice, extraGuest, currentActiveRoom, convenienceFee, gst, roomPrice, totalPrice, result
}) => {
  const [showModal, setShowModal] = useState(false);

  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Select Date</button>
    );
  };

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full flex-1 flex flex-col justify-between overflow-auto">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 py-1 flex flex-col ">
                      <div className="flex-1 bg-white dark:bg-neutral-900">
                        <CheckOutPagePageMain
                          startDate={startDate}
                          endDate={endDate}
                          guestAdultsInputValue={guestAdultsInputValue}
                          guestChildrenInputValue={guestChildrenInputValue}
                          guestInfantsInputValue={guestInfantsInputValue}
                          currentroomPrice={currentroomPrice}
                          numberOfRoomSelected={numberOfRoomSelected}
                          daysToStay={daysToStay}
                          workationDiscount={workationDiscount}
                          surgedPrice={surgedPrice}
                          extraGuest={extraGuest}
                          currentActiveRoom={currentActiveRoom}
                          convenienceFee={convenienceFee}
                          gst={gst}
                          roomPrice={roomPrice}
                          totalPrice={totalPrice}
                          result={result}
                        />
                        
                      </div>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalReserveMobile;
