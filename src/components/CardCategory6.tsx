import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'

export interface CardCategory6Props {
	className?: string
	taxonomy: TaxonomyType
}

const CardCategory6: FC<CardCategory6Props> = ({
	className = 'flex-1',
	taxonomy,
}) => {
	const { count, name, href = '/', thumbnail } = taxonomy
	return (
		<Link
			href={href}
			className={`nc-CardCategory6 group relative z-0 flex w-full overflow-hidden rounded-2xl ${className}`}
		>
			<div className="aspect-h-10 aspect-w-16 h-0 w-full sm:aspect-h-12 xl:aspect-h-9"></div>
			<Image
				fill
				alt=""
				src={thumbnail || ''}
				className="rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
				<span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
				<h2 className={`relative text-lg font-semibold lg:text-xl`}>{name}</h2>
				<span className={`relative mt-1.5 block text-sm text-neutral-100`}>
					{convertNumbThousand(count)} properties
				</span>
			</div>
		</Link>
	)
}

export default CardCategory6
