import React, { FC } from 'react'
import { PostDataType } from '@/data/types'
import PostCardMeta from '@/components/PostCardMeta'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon'
import { DEMO_POSTS } from '@/data/posts'
import Link from 'next/link'
import Image from 'next/image'

export interface Card12Props {
	className?: string
	post?: PostDataType
}

const Card12: FC<Card12Props> = ({
	className = 'h-full',
	post = DEMO_POSTS[0],
}) => {
	const { title, href, featuredImage, desc, postType } = post

	return (
		<div className={`nc-Card12 group relative flex flex-col ${className}`}>
			<Link
				href={"#"}
				className="aspect-h-3 aspect-w-4 relative block h-0 w-full flex-shrink-0 flex-grow overflow-hidden rounded-3xl"
			>
				<Image
					fill
					src={featuredImage}
					alt={title}
					sizes="(max-width: 768px) 100vw, 400px"
				/>
				<span>
					<PostTypeFeaturedIcon
						className="absolute bottom-2 left-2"
						postType={postType}
						wrapSize="w-8 h-8"
						iconSize="w-4 h-4"
					/>
				</span>
			</Link>

			<div className="mt-8 flex flex-col pr-10">
				<h2
					className={`nc-card-title block text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100 sm:text-2xl`}
				>
					<Link href={"#"} className="line-clamp-2" title={title}>
						{title}
					</Link>
				</h2>
				<span className="mt-4 hidden text-neutral-500 dark:text-neutral-400 sm:block">
					<span className="line-clamp-2"> {desc}</span>
				</span>
				<PostCardMeta className="mt-5" meta={post} />
			</div>
		</div>
	)
}

export default Card12
