import React, { FC } from 'react'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Link from 'next/link'
import Image from 'next/image'

export interface CollectionProps {
	className?: string
	featuredImage?: string
	name?: string
	desc?: string
	color?: string
}

const Collection: FC<CollectionProps> = ({
	className = '',
	featuredImage = 'https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&w=1600',
	name = 'Collection',
	desc = 'The most popular <br /> in the world',
	color,
}) => {
	return (
		<Link href={'/listing-stay'} className={`nc-Collection block ${className}`}>
			<div
				className={`group aspect-h-11 aspect-w-16 relative h-0 w-full overflow-hidden rounded-2xl sm:aspect-h-10 ${color}`}
			>
				<div>
					<Image
						src={featuredImage}
						fill
						alt=""
						className="object-cover"
						sizes="300px"
					/>
				</div>
				<span className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-40"></span>

				<div>
					<div className="absolute inset-5 flex flex-col">
						<div className="max-w-xs">
							<span className={`mb-2 block text-sm text-slate-700`}>
								{name}
							</span>
							{desc && (
								<h2
									className={`text-xl font-semibold text-slate-900 md:text-2xl`}
									dangerouslySetInnerHTML={{ __html: desc }}
								></h2>
							)}
						</div>
						<div className="mt-auto">
							<ButtonSecondary
								sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
								fontSize="text-sm font-medium"
							>
								Show more
							</ButtonSecondary>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Collection
