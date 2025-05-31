import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import Link from 'next/link'
import Image from 'next/image'

export interface CardCategory1Props {
	className?: string
	taxonomy: TaxonomyType
	size?: 'large' | 'normal'
}

const CardCategory1: FC<CardCategory1Props> = ({
	className = '',
	size = 'normal',
	taxonomy,
}) => {
	const { count, name, href = '/', thumbnail } = taxonomy
	return (
		<Link
			href={href}
			className={`nc-CardCategory1 flex items-center ${className}`}
			data-nc-id="CardCategory1"
		>
			<div
				className={`relative flex-shrink-0 ${
					size === 'large' ? 'h-20 w-20' : 'h-12 w-12'
				} mr-4 overflow-hidden rounded-lg`}
			>
				<Image alt="" fill src={thumbnail || ''} />
			</div>

			<div>
				<h2
					className={`${
						size === 'large' ? 'text-lg' : 'text-base'
					} nc-card-title font-semibold text-neutral-900 dark:text-neutral-100`}
				>
					{name}
				</h2>
				<span
					className={`${
						size === 'large' ? 'text-sm' : 'text-xs'
					} mt-[2px] block text-neutral-500 dark:text-neutral-400`}
				>
					{count} Articles
				</span>
			</div>
		</Link>
	)
}

export default CardCategory1
