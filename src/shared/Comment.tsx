import React from 'react'
import { FC } from 'react'
import Avatar from '@/shared/Avatar'

export interface CommentProps {
	isSmall?: boolean
}

const Comment: FC<CommentProps> = ({ isSmall }) => {
	return (
		<div className="nc-CommentCard flex">
			<div className="pt-1">
				<Avatar sizeClass={`w-6 h-6 ${!isSmall ? 'sm:h-8 sm:w-8 ' : ''}`} />
			</div>
			<div className="ml-2 flex flex-grow flex-col rounded-xl border border-neutral-200 p-4 text-sm dark:border-neutral-700 sm:ml-3 sm:text-base">
				<div className="relative flex items-center pr-6">
					<a
						className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
						href="/"
					>
						Foulcher Nathanil
					</a>
					<span className="mx-2">·</span>
					<span className="line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
						May 20, 2021
					</span>
				</div>
				<span className="mb-3 mt-2 block text-neutral-700 dark:text-neutral-300 sm:mb-4 sm:mt-3">
					In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at,
					feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend
					quam a odio. In hac habitasse platea dictumst.
				</span>
				<div>
					<button
						className="inline-flex h-8 min-w-[68px] items-center rounded-full bg-neutral-100 px-3 text-neutral-600 hover:bg-teal-50 hover:text-teal-600 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 dark:hover:text-teal-500"
						title="Reply"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2 h-[18px] w-[18px]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
							></path>
						</svg>
						<span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
							Reply
						</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Comment
