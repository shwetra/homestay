import CardCategory1 from '@/components/CardCategory1'
import { DEMO_CATEGORIES } from '@/data/taxonomies'
import { TaxonomyType } from '@/data/types'
import React, { FC } from 'react'
import WidgetHeading1 from './WidgetHeading1'

export interface WidgetCategoriesProps {
	className?: string
	categories?: TaxonomyType[]
}

const categoriesDemo: TaxonomyType[] = DEMO_CATEGORIES.filter((_, i) => i < 5)

const WidgetCategories: FC<WidgetCategoriesProps> = ({
	className = 'bg-neutral-100 dark:bg-neutral-800',
	categories = categoriesDemo,
}) => {
	return (
		<div
			className={`nc-WidgetCategories overflow-hidden rounded-3xl ${className}`}
		>
			<WidgetHeading1
				title="✨ Trending topic"
				viewAll={{ label: 'View all', href: '/#' }}
			/>
			<div className="flow-root">
				<div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
					{categories.map((category) => (
						<CardCategory1
							className="p-4 hover:bg-neutral-200 dark:hover:bg-neutral-700 xl:p-5"
							key={category.id}
							taxonomy={category}
							size="normal"
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default WidgetCategories
