import React, { FC } from 'react'
import PostCardMeta from '@/components/PostCardMeta'
import { PostDataType } from '@/data/types'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon'
import Link from 'next/link'
import Image from 'next/image'

export interface Card13Props {
	className?: string
	post: PostDataType
}

const Card13: FC<Card13Props> = ({ className = '', post }) => {
	// const { title, href, desc, featuredImage, date, postType } = post

	return (
		<div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
			{/* <div className="flex h-full flex-col py-2">
				<h2 className={`nc-card-title block text-base font-semibold`}>
					<Link href={href} className="line-clamp-2" title={title}>
						{title}
					</Link>
				</h2>
				<span className="my-3 hidden text-neutral-500 dark:text-neutral-400 sm:block">
					<span className="line-clamp-2"> {desc}</span>
				</span>
				<span className="mt-4 block text-sm text-neutral-500 sm:hidden">
					{date}
				</span>
				<div className="mt-auto hidden sm:block">
					<PostCardMeta meta={{ ...post }} />
				</div>
			</div>

			<Link
				href={href}
				className={`relative ml-3 block h-full w-2/5 flex-shrink-0 sm:ml-5 sm:w-1/3`}
			>
				<Image
					fill
					className="rounded-xl object-cover sm:rounded-3xl"
					src={featuredImage}
					alt={title}
					sizes="(max-width: 768px) 100vw, 400px"
				/>
				<PostTypeFeaturedIcon
					className="absolute bottom-2 left-2"
					postType={postType}
					wrapSize="w-8 h-8"
					iconSize="w-4 h-4"
				/>
			</Link> */}
			jjhk
		</div>
	)
}

export default Card13
