'use client'

import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import Slider from 'rc-slider'
import convertNumbThousand from '@/utils/convertNumbThousand'

export interface PriceRangeInputProps {
	onChange?: (e: number[]) => void
	defaultValue?: number[]
}

const PriceRangeInput: FC<PriceRangeInputProps> = ({
	onChange,
	defaultValue,
}) => {
	const [rangePrices, setRangePrices] = useState(
		defaultValue || [100000, 4000000],
	)

	useEffect(() => {
		if (!defaultValue) return
		setRangePrices(defaultValue)
	}, [defaultValue])

	return (
		<div className="p-5">
			<span className="block text-xl font-semibold sm:text-2xl">
				Range Price?
			</span>
			<div className="relative mt-7 flex flex-col space-y-8">
				<Slider
					range
					className="text-red-400"
					min={10000}
					max={10000000}
					defaultValue={[rangePrices[0], rangePrices[1]]}
					allowCross={false}
					step={1000}
					onChange={(e) => {
						setRangePrices(e as number[])
						onChange && onChange(e as number[])
					}}
				/>

				<div className="flex justify-between space-x-3">
					<div>
						<label
							htmlFor="minPrice"
							className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
						>
							Min price
						</label>
						<div className="relative mt-1 rounded-md">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span className="text-sm text-neutral-500">$</span>
							</div>
							<input
								type="text"
								disabled
								name="minPrice"
								id="minPrice"
								className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-sm text-neutral-900 focus:border-primary-500 focus:ring-primary-500"
								value={convertNumbThousand(rangePrices[0])}
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="maxPrice"
							className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
						>
							Max price
						</label>
						<div className="relative mt-1 rounded-md">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span className="text-sm text-neutral-500">$</span>
							</div>
							<input
								disabled
								type="text"
								name="maxPrice"
								id="maxPrice"
								className="focus:border-priring-primary-500 block w-full rounded-full border-neutral-200 pl-7 pr-3 text-sm text-neutral-900 focus:ring-primary-500"
								value={convertNumbThousand(rangePrices[1])}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PriceRangeInput
