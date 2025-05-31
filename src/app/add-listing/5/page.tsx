import React, { FC } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Checkbox from '@/shared/Checkbox'
import FormItem from '../FormItem'

export interface PageAddListing5Props {}

const PageAddListing5: FC<PageAddListing5Props> = () => {
	return (
		<>
			<h2 className="text-2xl font-semibold">Food</h2>
			{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
			{/* FORM */}
			<div className="space-y-0" style={{marginTop:'1rem'}}>
				{/* ITEM */}
				<FormItem
					label="Do you provide meals to your guests?"
				>
					<Select>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</Select>
				</FormItem>
                <div className='py-3'>
                    <label className="text-sm font-medium">If yes, what kind of food do you serve:</label>
                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <Checkbox label="Local" name="Local" />
                        <Checkbox label="North Indian" name="North_Indian" />
                        <Checkbox label="South Indian" name="South_Indian" />
                        <Checkbox label="Continental" name="Continental" />
                        <Checkbox label="Chinese" name="Chinese" />
                        <Checkbox label="Any Other" name="Any_Other" />
                    </div>
                </div>
                <FormItem label="Do you serve Non vegetarian food?" >
					<Select>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</Select>
				</FormItem>
				<FormItem className='py-3'
					label="Mention a few local dishes that guests can try while staying with you."
				>
					<Input placeholder="" />
				</FormItem>
                <FormItem label="Do you have a guest kitchen if someone wants to do self cooking?" >
					<Select>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</Select>
				</FormItem>
                <FormItem className='py-3' label="Do online food ordering apps deliver at your place?" >
					<Select>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</Select>
				</FormItem>
			</div>
		</>
	)
}

export default PageAddListing5
