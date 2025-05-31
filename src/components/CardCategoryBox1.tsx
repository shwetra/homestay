import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import Badge from '@/shared/Badge'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'

export interface CardCategoryBox1Props {
	className?: string
	taxonomy: any
}

const CardCategoryBox1: FC<CardCategoryBox1Props> = ({
	className = '',
	taxonomy,
}) => {
	const { count, name, thumbnail, href = '/',city,image } = taxonomy
	return (
		<a
			href={`/listing-stay-map/${city}`}
			className={`nc-CardCategoryBox1 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] relative flex items-center p-3 sm:p-6 ${className}`}
		>
			<Badge
				className="absolute right-2 top-2"
				color="gray"
				name={convertNumbThousand(count)}
			/>

			<div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
				<Image
					src={image || thumbnail || ''}
					fill
					alt=""
					sizes="(max-width: 400px) 100vw, 400px"
				/>
			</div>
			<div className="ml-4 flex-grow overflow-hidden">
				<h2 className="text-base font-medium">
					<span className="line-clamp-1">{city}</span>
				</h2>
				<span
					className={`mt-2 block text-sm text-neutral-500 dark:text-neutral-400`}
				>
					19 minutes drive
				</span>
			</div>
		</a>
	)
}

export default CardCategoryBox1
