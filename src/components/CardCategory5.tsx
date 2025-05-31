import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'

export interface CardCategory5Props {
	className?: string
	taxonomy: any
}

const CardCategory5: FC<CardCategory5Props> = ({
	className = '',
	taxonomy,
}) => {
	const { count, name, href = '/', thumbnail, image_url, description } = taxonomy
	return (
		<Link
			href={href}
			className={`nc-CardCategory5 flex flex-col ${className}`}
			data-nc-id="CardCategory5"
		>
			<div
				className={`group aspect-h-3 aspect-w-4 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-2xl`}
			>
				<Image
					fill
					alt=""
					src={image_url || thumbnail || ''}
					className="h-full w-full rounded-2xl object-cover"
					sizes="(max-width: 400px) 100vw, 400px"
				/>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>
			<div className="mt-4 truncate px-3">
				<h2
					className={`truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg`}
				>
					{name}
				</h2>
				<p>{description}</p>
				<span
					className={`mt-2 block text-sm text-neutral-600 dark:text-neutral-400`}
				>
					{convertNumbThousand(count)} properties
				</span>
			</div>
		</Link>
	)
}

export default CardCategory5
