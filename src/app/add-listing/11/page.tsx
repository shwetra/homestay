import React, { FC } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { PlusIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'

export interface PageAddListing11Props {}

const PageAddListing11: FC<PageAddListing11Props> = () => {
	const renderRadio = (
		name: string,
		id: string,
		label: string,
		defaultChecked?: boolean,
	) => {
		return (
			<div className="flex items-center">
				<input
					defaultChecked={defaultChecked}
					id={id + name}
					name={name}
					type="radio"
					className="!checked:bg-primary-500 h-6 w-6 border-neutral-300 bg-transparent text-primary-500 focus:ring-primary-500"
				/>
				<label
					htmlFor={id + name}
					className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
				>
					{label}
				</label>
			</div>
		)
	}

	const renderNoInclude = (text: string) => {
		return (
			<div className="flex items-center justify-between py-3">
				<span className="font-medium text-neutral-600 dark:text-neutral-400">
					{text}
				</span>
				<XCircleIcon className="h-5 w-5 text-neutral-400 dark:text-neutral-300" />
			</div>
		)
	}

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					Set house rules for your guests{' '}
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					Guests must agree to your house rules before they book.
				</span>
			</div>
			{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
			{/* FORM */}
			<div className="space-y-2">
				{/* ITEM */}
				<div  style={{marginTop:'-1rem'}}>
					<label className="text-lg font-semibold" htmlFor="">
						General amenities
					</label>
					<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{renderRadio('Smoking', 'Do', 'Do not allow')}
						{renderRadio('Smoking', 'Allow', 'Allow', true)}
						{renderRadio('Smoking', 'Charge', 'Charge')}
					</div>
				</div>

				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						Pet
					</label>
					<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{renderRadio('Pet', 'Do', 'Do not allow')}
						{renderRadio('Pet', 'Allow', 'Allow', true)}
						{renderRadio('Pet', 'Charge', 'Charge')}
					</div>
				</div>

				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						Party organizing
					</label>
					<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{renderRadio('Partyorganizing', 'Do', 'Do not allow')}
						{renderRadio('Partyorganizing', 'Allow', 'Allow', true)}
						{renderRadio('Partyorganizing', 'Charge', 'Charge')}
					</div>
				</div>

				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						Cooking
					</label>
					<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{renderRadio('Cooking', 'Do', 'Do not allow')}
						{renderRadio('Cooking', 'Allow', 'Allow', true)}
						{renderRadio('Cooking', 'Charge', 'Charge')}
					</div>
				</div>

				{/* ----------- */}
				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
				<span className="block text-lg font-semibold">Additional rules</span>
				<div className="flow-root">
					<div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
						{renderNoInclude('No smoking in common areas')}
						{renderNoInclude('Do not wear shoes/shoes in the house')}
						{renderNoInclude('No cooking in the bedroom')}
					</div>
				</div>
				<div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-x-5 sm:space-y-0">
					<Input className="!h-full" placeholder="No smoking..." />
					<ButtonPrimary className="flex-shrink-0">
						<PlusIcon className="h-5 w-5" />
						<span className="ml-3">Add tag</span>
					</ButtonPrimary>
				</div>
			</div>
		</>
	)
}

export default PageAddListing11
