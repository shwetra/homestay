import { ArrowUpTrayIcon, HeartIcon } from '@heroicons/react/24/outline'
import React from 'react'

const LikeSaveBtns = () => {
	return (
		<div className="flow-root">
			<div className="-mx-3 -my-1.5 flex text-sm text-neutral-700 dark:text-neutral-300">
				<span className="flex cursor-pointer rounded-lg px-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800">
					<ArrowUpTrayIcon className="h-5 w-5" />
					<span className="ml-2.5 hidden sm:block">Share</span>
				</span>
				<span className="flex cursor-pointer rounded-lg px-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800">
					<HeartIcon className="h-5 w-5" />
					<span className="ml-2.5 hidden sm:block">Save</span>
				</span>
			</div>
		</div>
	)
}

export default LikeSaveBtns
