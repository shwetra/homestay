import React, { FC } from 'react'
import Textarea from '@/shared/Textarea'

export interface PageAddListing12Props {}

const PageAddListing12: FC<PageAddListing12Props> = () => {
	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					Your place description for client
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					Mention the best features of your accommodation, any special amenities
					like fast Wi-Fi or parking, as well as things you like about the
					neighborhood.
				</span>
			</div>

			<Textarea placeholder="..." rows={10} />
		</>
	)
}

export default PageAddListing12
