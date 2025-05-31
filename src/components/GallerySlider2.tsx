'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { variants } from '@/utils/animationVariants'
import Link from 'next/link'
import { Route } from '@/routers/types'

export interface GallerySliderProps {
    className?: string
    galleryImgs: any //(StaticImageData | string)[] 
    ratioClass?: string
    uniqueID: string
    href?: any //Route<string>
    imageClass?: string
    galleryClass?: string
    navigation?: boolean
}

export default function GallerySlider2({
    className = '',
    galleryImgs,
    ratioClass = 'aspect-w-4 aspect-h-3',
    imageClass = '',
    uniqueID = 'uniqueID',
    galleryClass = 'rounded-xl',
    href = '/listing-stay-detail',
    navigation = true,
}: any) {
    const [loaded, setLoaded] = useState(false)
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    // Swipeable handlers (always called unconditionally)
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (index < images?.length - 1) {
                changePhotoId(index + 1)
            }
        },
        onSwipedRight: () => {
            if (index > 0) {
                changePhotoId(index - 1)
            }
        },
        trackMouse: true,
    })

    // Check if galleryImgs has data
    const hasImages = Array.isArray(galleryImgs) && galleryImgs.length > 0;

    // If no images, return early or display a message
    if (!hasImages) {
        return <div>No images available</div>;
    }

    // Initialize images outside any condition
    const images = galleryImgs

    // Change photo function
    function changePhotoId(newVal: number) {
        if (newVal > index) {
            setDirection(1)
        } else {
            setDirection(-1)
        }
        setIndex(newVal)
    }

    let currentImage = images[index]?.image_url

    return (
        <MotionConfig
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div
                className={`group/cardGallerySlider group relative ${className}`}
                {...handlers}
            >
                {/* Main image */}
                <div className={`w-full overflow-hidden ${galleryClass}`}>
                    <Link
                        href={href}
                        className={`relative flex items-center justify-center ${ratioClass}`}
                    >
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants(340, 1)}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <Image
                                    src={currentImage || ''}
                                    fill
                                    alt="listing card gallery"
                                    className={`object-cover ${imageClass}`}
                                    onLoad={() => setLoaded(true)}
                                    sizes="(max-width: 1025px) 100vw, 300px"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </Link>
                </div>

                {/* Buttons + bottom nav bar */}
                <>
                    {/* Buttons */}
                    {loaded && navigation && (
                        <div className="opacity-0 transition-opacity group-hover/cardGallerySlider:opacity-100">
                            {index > 0 && (
                                <button
                                    className="absolute left-3 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500"
                                    style={{ transform: 'translate3d(0, 0, 0)' }}
                                    onClick={() => changePhotoId(index - 1)}
                                >
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </button>
                            )}
                            {index + 1 < images.length && (
                                <button
                                    className="absolute right-3 top-[calc(50%-16px)] flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500"
                                    style={{ transform: 'translate3d(0, 0, 0)' }}
                                    onClick={() => changePhotoId(index + 1)}
                                >
                                    <ChevronRightIcon className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Bottom Nav bar */}
                    <div className="absolute inset-x-0 bottom-0 h-10 rounded-b-lg bg-gradient-to-t from-neutral-900 opacity-50"></div>
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform items-center justify-center space-x-1.5">
                        {images.map((_: any, i: any) => (
                            <button
                                className={`h-1.5 w-1.5 rounded-full ${
                                    i === index ? 'bg-white' : 'bg-white/60'
                                }`}
                                onClick={() => changePhotoId(i)}
                                key={i}
                            />
                        ))}
                    </div>
                </>
            </div>
        </MotionConfig>
    )
}
