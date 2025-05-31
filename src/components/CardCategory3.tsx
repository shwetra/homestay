import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'

export interface CardCategory3Props {
	className?: string
	taxonomy: any
}

const CardCategory3: FC<CardCategory3Props> = ({
	className = '',
	taxonomy,
}) => {
	const { count, name, href = '/', thumbnail, image, image_url } = taxonomy


	return (
		<a href={`/listing-stay-map/${name}`} className={`nc-CardCategory3 flex flex-col ${className}`}>
			<div
				className={`group aspect-h-5 aspect-w-5 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-2xl sm:aspect-h-6`}
			>
				<Image
					src={ image_url || thumbnail || ''}
					className="h-full w-full rounded-2xl object-cover"
					alt="places"
					fill
					sizes="(max-width: 400px) 100vw, 300px"
				/>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>
			<div className="mt-4 truncate">
				<h2
					className={`truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg`}
				>
					{name}
				</h2>
				<span
					className={`mt-1.5 block text-sm text-neutral-600 dark:text-neutral-400`}
				>
					{/* {count && (convertNumbThousand(count || 0))} {count && ("properties")} */}
					{count} Properties
				</span>
			</div>
		</a>
	)
}

export default CardCategory3
