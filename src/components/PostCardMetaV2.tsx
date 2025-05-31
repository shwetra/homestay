import React, { FC } from 'react'
import Avatar from '@/shared/Avatar'
import { PostDataType } from '@/data/types'
import Link from 'next/link'
import { UrlObject } from 'url'


export interface PostCardMetaV2Props {
	className?: string
	meta: Pick<PostDataType, 'date' | 'author' | 'title'>
	hiddenAvatar?: boolean
	size?: 'large' | 'normal'
}

const PostCardMetaV2: FC<PostCardMetaV2Props> = ({
	className = 'leading-none',
	meta,
	hiddenAvatar = false,
	size = 'normal',
}) => {
	const { date, author, title } = meta
	const hrefObj: UrlObject = typeof author === 'object' && author.href ? { pathname: author.href } : { pathname: '#' };
	return (
		<div
			className={`nc-PostCardMetaV2 inline-flex flex-wrap items-center text-neutral-800 dark:text-neutral-200 ${
				size === 'normal' ? 'text-xs' : 'text-sm'
			} ${className}`}
			data-nc-id="PostCardMetaV2"
		>
			<Link
				href={hrefObj}
				className="relative flex items-center space-x-2"
				>
				{!hiddenAvatar && (
					<Avatar
						radius="rounded-full"
						sizeClass={
							size === 'normal' ? 'h-9 w-9 text-base' : 'h-10 w-10 text-xl'
						}
						imgUrl={author.avatar}
						userName={author.displayName}
					/>
				)}
				<div>
					<h2
						className={`block font-semibold ${
							size === 'normal' ? 'text-base' : 'text-lg'
						}`}
					>
						<span className="line-clamp-1">{title}</span>
					</h2>

					<div className="mt-1.5 flex">
						<span className="block font-medium text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">
							{author.displayName}
						</span>
						<span className="mx-[6px] font-medium text-neutral-500 dark:text-neutral-400">
							·
						</span>
						<span className="font-normal text-neutral-500 dark:text-neutral-400">
							{date}
						</span>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default PostCardMetaV2
