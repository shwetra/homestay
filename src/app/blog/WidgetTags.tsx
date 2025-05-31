import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import WidgetHeading1 from './WidgetHeading1'
import Tag from '@/shared/Tag'
import { DEMO_TAGS } from '@/data/taxonomies'

export interface WidgetTagsProps {
	className?: string
	tags?: TaxonomyType[]
}
const tagsDemo = DEMO_TAGS.filter((_, i) => i > 5)

const WidgetTags: FC<WidgetTagsProps> = ({
	className = 'bg-neutral-100 dark:bg-neutral-800',
	tags = tagsDemo,
}) => {
	return (
		<div className={`nc-WidgetTags overflow-hidden rounded-3xl ${className}`}>
			<WidgetHeading1
				title="🏷 Discover more tags"
				viewAll={{ label: 'View all', href: '/#' }}
			/>
			<div className="flex flex-wrap p-4 xl:p-5">
				{tags.map((tag) => (
					<Tag className="mb-2 mr-2" key={tag.id} tag={tag} />
				))}
			</div>
		</div>
	)
}

export default WidgetTags
