import React, { FC } from 'react'
import Avatar from '@/shared/Avatar'
import { PostDataType } from '@/data/types'
import Link from 'next/link'

export interface PostCardMetaProps {
	className?: string
	meta: Pick<PostDataType, 'created_at' | 'user'>
	hiddenAvatar?: boolean
	size?: 'large' | 'normal'
}

const PostCardMeta: FC<PostCardMetaProps> = ({
	className = 'leading-none',
	meta,
	hiddenAvatar = false,
	size = 'normal',
}) => {
	const { created_at, user } = meta
	// console.log(meta,"datette")

	return (
		<div
			className={`nc-PostCardMeta flex-wrap inline-flex items-center text-neutral-800 dark:text-neutral-200 ${
				size === 'normal' ? 'text-sm' : 'text-base'
			} ${className}`}
			data-nc-id="PostCardMeta"
		>
			<Link
				href={"#"}
				className="relative flex flex-shrink-0 items-center space-x-2"
			>
				{!hiddenAvatar && (
					<Avatar
						radius="rounded-full"
						sizeClass={
							size === 'normal' ? 'h-7 w-7 text-sm' : 'h-10 w-10 text-xl'
						}
						imgUrl={user?.profile_src || 'https://homestay.kliffhost.in/public/images/default-profile.png'}
						userName={`${user?.first_name || 'Unknown'} ${user?.last_name || ''}`}
					/>
				)}
				<span className="block font-medium text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">
					{user?.first_name} {user?.last_name}
				</span>
			</Link>
			<>
				<span className="mx-[6px] font-medium text-neutral-500 dark:text-neutral-400">
					·
				</span>
				<span className="line-clamp-1 font-normal text-neutral-500 dark:text-neutral-400">
					{new Date(created_at).toLocaleDateString()}
				</span>
			</>
		</div>
	)
}

export default PostCardMeta
