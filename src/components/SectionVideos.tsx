'use client'

import Heading from '@/shared/Heading'
import NcPlayIcon from '@/shared/NcPlayIcon'
import NcPlayIcon2 from '@/shared/NcPlayIcon2'
import Image from 'next/image'
import React, { FC, useState } from 'react'

export interface VideoType {
	id: string
	title: string
	thumbnail: string
}

export interface SectionVideosProps {
	videos?: VideoType[]
	className?: string
}

const VIDEOS_DEMO: VideoType[] = [
	{
		id: 'Ao7e4iisKMs',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.pexels.com/photos/131423/pexels-photo-131423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: 'a5V6gdu5ih8',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: 'MuB7HHeuNbc',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: 'eEaZvEZye84',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.pexels.com/photos/4983184/pexels-photo-4983184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: 'EuDJZDaSP0Q',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
]

const SectionVideos: FC<SectionVideosProps> = ({
	videos = VIDEOS_DEMO,
	className = '',
}) => {
	const [isPlay, setIsPlay] = useState(false)
	const [currentVideo, setCurrentVideo] = useState(0)

	const renderMainVideo = () => {
		const video: VideoType = videos[currentVideo]
		return (
			<div
				className="group aspect-h-16 aspect-w-16 overflow-hidden rounded-3xl border-4 border-white bg-neutral-800 will-change-transform sm:aspect-h-9 dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px]"
				title={video.title}
			>
				{isPlay ? (
					<iframe
						src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
						title={video.title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				) : (
					<>
						<div
							onClick={() => setIsPlay(true)}
							className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center"
						>
							<NcPlayIcon />
						</div>

						<Image
							fill
							className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
							src={video.thumbnail}
							title={video.title}
							alt={video.title}
							sizes="(max-width: 1000px) 100vw,
                (max-width: 1200px) 75vw,
                50vw"
						/>
					</>
				)}
			</div>
		)
	}

	const renderSubVideo = (video: VideoType, index: number) => {
		if (index === currentVideo) return null
		return (
			<div
				className="group aspect-h-16 aspect-w-16 relative cursor-pointer overflow-hidden rounded-2xl sm:aspect-h-12 lg:aspect-h-9 sm:rounded-3xl"
				onClick={() => {
					setCurrentVideo(index)
					!isPlay && setIsPlay(true)
				}}
				title={video.title}
				key={String(index)}
			>
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					<NcPlayIcon2 />
				</div>
				<Image
					fill
					className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
					src={video.thumbnail}
					title={video.title}
					alt={video.title}
					sizes="(max-width: 300px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
				/>
			</div>
		)
	}

	return (
		<div className={`nc-SectionVideos ${className}`}>
			<Heading
				desc="Check out our hottest videos. View more and share more new
          perspectives on just about any topic. Everyone’s welcome."
			>
				🎬 The Videos
			</Heading>

			<div className="relative flex flex-col sm:py-4 sm:pr-4 md:py-6 md:pr-6 lg:flex-row xl:py-14 xl:pr-14">
				<div className="absolute -bottom-4 -right-4 -top-4 z-0 w-2/3 rounded-3xl bg-primary-100 bg-opacity-40 dark:bg-neutral-800 dark:bg-opacity-40 sm:rounded-[50px] md:bottom-0 md:right-0 md:top-0 xl:w-1/2"></div>
				<div className="relative flex-grow pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
					{renderMainVideo()}
				</div>
				<div className="grid flex-shrink-0 grid-cols-4 gap-2 sm:gap-6 lg:w-36 lg:grid-cols-1 xl:w-40">
					{videos.map(renderSubVideo)}
				</div>
			</div>
		</div>
	)
}

export default SectionVideos
