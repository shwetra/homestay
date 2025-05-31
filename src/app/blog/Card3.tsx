import React, { FC } from 'react'
import PostCardMeta from '@/components/PostCardMeta'
import { PostDataType } from '@/data/types'
import CategoryBadgeList from '@/components/CategoryBadgeList'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon'
import Link from 'next/link'
import Image from 'next/image'

export interface Card3Props {
	className?: string
	post: PostDataType
}

const Card3: FC<Card3Props> = ({ className = 'h-full', post }) => {
	const { title, href, featuredImage, desc, categories, postType } = post

	return (
		<div
			className={`nc-Card3 group relative flex flex-col-reverse rounded-[40px] sm:flex-row sm:items-center ${className}`}
		>
			<div className="flex flex-grow flex-col">
				<div className="mb-4 space-y-5">
					<CategoryBadgeList categories={categories} />
					<div>
						<h2
							className={`nc-card-title block text-xl font-semibold text-neutral-900 dark:text-neutral-100`}
						>
							<Link href={"#"} className="line-clamp-2" title={title}>
								{title}
							</Link>
						</h2>
						<div className="hidden sm:mt-2 sm:block">
							<span className="line-clamp-1 text-base text-neutral-500 dark:text-neutral-400">
								{desc}
							</span>
						</div>
					</div>

					<PostCardMeta meta={{ ...post }} />
				</div>
			</div>

			<div
				className={`mb-5 block flex-shrink-0 overflow-hidden rounded-3xl sm:mb-0 sm:ml-6 sm:w-56`}
			>
				<Link
					href={"#"}
					className={`aspect-h-9 aspect-w-16 block h-0 w-full sm:aspect-h-16`}
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
			</div>
		</div>
	)
}

export default Card3
