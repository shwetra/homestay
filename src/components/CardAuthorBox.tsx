import React, { FC } from 'react'
import { AuthorType } from '@/data/types'
import { StarIcon } from '@heroicons/react/24/solid'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import Link from 'next/link'

export interface CardAuthorBoxProps {
	className?: string
	author: AuthorType
	index?: number
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({
	className = '',
	author,
	index,
}) => {
	const { displayName, href = '/', avatar, starRating } = author
	return (
		<Link
			href={href}
			className={`nc-CardAuthorBox [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] relative flex flex-col items-center justify-center px-3 py-5 text-center sm:px-6 sm:py-7 ${className}`}
		>
			{index && (
				<Badge
					className="absolute left-3 top-3"
					color={index === 1 ? 'red' : index === 2 ? 'blue' : 'green'}
					name={`#${index}`}
				/>
			)}
			<Avatar
				sizeClass="w-20 h-20 text-2xl"
				radius="rounded-full"
				imgUrl={avatar}
				userName={displayName}
			/>
			<div className="mt-3">
				<h2 className={`text-base font-medium`}>
					<span className="line-clamp-1">{displayName}</span>
				</h2>
				<span
					className={`mt-1.5 block text-sm text-neutral-500 dark:text-neutral-400`}
				>
					New York
				</span>
			</div>
			<div className="mt-4 flex items-center justify-center rounded-full bg-neutral-100 px-5 py-2 dark:bg-neutral-800">
				<span className="pt-[1px] text-xs font-medium">
					{starRating || 4.9}
				</span>
				<StarIcon className="ml-2 h-5 w-5 text-amber-500" />
			</div>
		</Link>
	)
}

export default CardAuthorBox
