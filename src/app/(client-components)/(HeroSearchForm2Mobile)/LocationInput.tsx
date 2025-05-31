'use client'

import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect, useRef, FC } from 'react'

interface Props {
	onClick?: () => void
	onChange?: (value: string) => void
	className?: string
	defaultValue?: string
	headingText?: string
}

const LocationInput: FC<Props> = ({
	onChange = () => {},
	className = '',
	defaultValue = 'United States',
	headingText = 'Where to?',
}) => {
	const [value, setValue] = useState('')
	const containerRef = useRef(null)
	const inputRef = useRef(null)

	useEffect(() => {
		setValue(defaultValue)
	}, [defaultValue])

	const handleSelectLocation = (item: string) => {
		// DO NOT REMOVE SETTIMEOUT FUNC
		setTimeout(() => {
			setValue(item)
			onChange && onChange(item)
		}, 0)
	}

	const renderSearchValues = ({
		heading,
		items,
	}: {
		heading: string
		items: string[]
	}) => {
		return (
			<>
				<p className="block text-base font-semibold">
					{heading || 'Destinations'}
				</p>
				<div className="mt-3">
					{items.map((item) => {
						return (
							<div
								className="mb-1 flex items-center space-x-3 py-2 text-sm"
								onClick={() => handleSelectLocation(item)}
								key={item}
							>
								<MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
								<span className="">{item}</span>
							</div>
						)
					})}
				</div>
			</>
		)
	}

	return (
		<div className={`${className}`} ref={containerRef}>
			<div className="p-5">
				<span className="block text-xl font-semibold sm:text-2xl">
					{headingText}
				</span>
				<div className="relative mt-5">
					<input
						className={`block w-full truncate rounded-xl border border-neutral-900 bg-transparent px-4 py-3 pr-12 text-base font-medium leading-none placeholder-neutral-500 placeholder:truncate focus:outline-none focus:ring-0 dark:border-neutral-200 dark:placeholder-neutral-300`}
						placeholder={'Search destinations'}
						value={value}
						onChange={(e) => setValue(e.currentTarget.value)}
						ref={inputRef}
					/>
					<span className="absolute right-2.5 top-1/2 -translate-y-1/2">
						<MagnifyingGlassIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
					</span>
				</div>
				<div className="mt-7">
					{value
						? renderSearchValues({
								heading: 'Locations',
								items: [
									'Afghanistan',
									'Albania',
									'Algeria',
									'American Samao',
									'Andorra',
								],
							})
						: renderSearchValues({
								heading: 'Popular destinations',
								items: [
									'Australia',
									'Canada',
									'Germany',
									'United Kingdom',
									'United Arab Emirates',
								],
							})}
				</div>
			</div>
		</div>
	)
}

export default LocationInput
