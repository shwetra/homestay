"use client"

import './styles/index.css'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import Logo from '@/shared/Logo'
import { useImages } from '@/app/contextApi/ImageContext'
import { useLastViewedPhoto } from './utils/useLastViewedPhoto'
import type { ListingGalleryImage } from './utils/types'

export const DEMO_IMAGE: ListingGalleryImage[] = [
  'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg',
  'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg',
  'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg',
].map((url, index) => ({
  id: index,
  url: { image_url: url }, // convert string to object
}))





 
 interface GetNewParamProps {
  paramName?: string;
  value: string | number;
}

export const getNewParam = ({ paramName = 'photoId', value }: GetNewParamProps): string => {
  const params = new URLSearchParams(window.location.search);
  params.set(paramName, String(value));
  return params.toString();
};

// const getNewParam = ({
//   paramName = 'photoId',
//   val,
// }: {
//   paramName?: string
//   val: string | number
// }) => {
//   const params = new URLSearchParams(document.location.search)
//   params.set(paramName, String(value))
//   return params.toString()
// }

interface Props {
  images?: ListingGalleryImage[]
}

const ListingImageGallery: FC<Props> = ({ images = DEMO_IMAGE }) => {
  const searchParams = useSearchParams()
  const photoId = searchParams?.get('photoId')
  const modal = searchParams?.get('modal')
  const isShowModal = modal === 'PHOTO_TOUR_SCROLLABLE'
  const router = useRouter()
  const pathname = usePathname()
  const { imagess } = useImages()
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
  const lastViewedPhotoRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  useEffect(() => {
    if (isShowModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isShowModal])

  const updatedImages: ListingGalleryImage[] = (imagess.length ? imagess : images).map(
    (url, index) => ({ id: index, url })
  )

  const handleClose = () => {
    const params = new URLSearchParams(document.location.search)
    params.delete('modal')
    params.delete('photoId')
    router.push(`${pathname}/?${params.toString()}` as any)
  }



  const selectedImage = updatedImages.find((img) => img.id === Number(photoId))

  return (
    <>
      {/* Modal View */}
      <Transition appear show={isShowModal} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={handleClose}>
          <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div className="relative w-full max-w-screen-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 left-4 bg-white p-2 rounded-full shadow hover:bg-gray-100 " style={{marginTop: '3rem'}}
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>

              {selectedImage && (
                <div className="flex flex-col lg:flex-row gap-4 max-h-[80vh] pt-5">
                  {/* Left: Text */}
                  <div className="w-full lg:w-5/12 p-4 overflow-y-auto listing_p" style={{ paddingLeft: '3rem'}}>
                    <Logo />
                    {/* <h2 className="text-2xl font-semibold mb-4">HomeStays</h2> */}
                    <p className="text-sm text-gray-700 mb-2">
					Where Families Find Comfort, and Every Stay Feels Like Home.
                    </p>
					<p  className="text-sm text-gray-700 mb-2">{"Home Stay is more than a place to sleep — it's where families gather, laughter echoes through the halls, and every stay feels like coming home."}</p>
        
                  </div>

                  {/* Right: Large Image */}
                  <div className="w-full lg:w-7/12 flex items-center justify-center image_details">
                    <Image
                      alt="Selected"
                      src={selectedImage.url.image_url}
                      width={1000}
                      height={800}
                      className="rounded-lg object-contain w-full max-h-[80vh]"
                    />
                  </div>
                </div>
              )}

              {/* Thumbnails */}
              <div className="w-full mt-4 overflow-x-auto flex space-x-2 pb-2 px-4">
                {updatedImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => router.push(`${pathname}/?${getNewParam({ value: img.id })}&modal=PHOTO_TOUR_SCROLLABLE` as any)}
                    className={`cursor-pointer min-w-[100px] border-2 rounded-lg overflow-hidden ${
                      selectedImage?.id === img.id ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      alt="Thumbnail"
                      src={img.url.image_url}
                      width={120}
                      height={80}
                      className="object-cover w-full h-24"
                    />
                    <p>{img.url.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Grid View */}
      {/* {!isShowModal && (
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-4">
          {updatedImages.map(({ id, url }) => (
            <div
              key={id}
              onClick={() => router.push(`${pathname}/?${getNewParam({ value: id })}&modal=PHOTO_TOUR_SCROLLABLE` as any)}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              className="group relative mb-5 block w-full cursor-pointer"
            >
              <Image
                alt="Gallery image"
                src={url}
                width={720}
                height={480}
                className="rounded-lg transition duration-200 group-hover:brightness-110"
              />
            </div>
          ))}
        </div>
      )} */}
    </>
  )
}

export default ListingImageGallery;
