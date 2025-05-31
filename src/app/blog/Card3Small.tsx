import React, { FC } from 'react'
import PostCardMeta from '@/components/PostCardMeta'
import { PostDataType } from '@/data/types'
import Link from 'next/link'
import Image from 'next/image'

export interface Card3SmallProps {
	className?: string
	post: PostDataType
}

const Card3Small: FC<Card3SmallProps> = ({ className = 'h-full', post }) => {
	const { title, href, featuredImage } = post

	return (
		<div
			className={`nc-Card3Small relative flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between ${className}`}
			data-nc-id="Card3Small"
		>
			<Link href={"#"} className="absolute inset-0" title={title}></Link>
			<div className="relative space-y-2">
				<PostCardMeta meta={{ ...post }} />
				<h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
					<Link href={"#"} className="line-clamp-2" title={title}>
						{title}
					</Link>
				</h2>
			</div>

			<Link
				href={"#"}
				title={title}
				className={`group relative mb-5 block flex-shrink-0 overflow-hidden rounded-lg sm:mb-0 sm:ml-4 sm:w-20`}
			>
				<div className={`aspect-h-9 aspect-w-16 h-0 w-full sm:aspect-h-16`}>
					<Image
						fill
						className="transform object-cover transition-transform duration-300 group-hover:scale-110"
						src={featuredImage}
						title={title}
						alt=""
						sizes="(max-width: 768px) 100vw, 300px"
					/>
				</div>
			</Link>
		</div>
	)
}

export default Card3Small
