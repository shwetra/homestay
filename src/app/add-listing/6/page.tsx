import React, { FC } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Checkbox from '@/shared/Checkbox'
import FormItem from '../FormItem'
import Textarea from '@/shared/Textarea'

export interface PageAddListing6Props {}

const PageAddListing6: FC<PageAddListing6Props> = () => {
	return (
		<>
			<h2 className="text-2xl font-semibold">Personal Details</h2>
			{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
			{/* FORM */}
			<div className="space-y-0" style={{marginTop:'1rem'}}>
				{/* ITEM */}
                <div className='grid sm:grid-cols-2 gap-5'>
                    <FormItem className=''
                        label="Phone Number"
                    >
                        <Input />
                    </FormItem>
                    <FormItem className=''
                        label="Alternate Number"
                    >
                        <Input />
                    </FormItem>
                </div>
                <div className='grid sm:grid-cols-2 gap-5 py-2'>
                    <FormItem className=''
                        label="Mail Id"
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        label="Do you (host) live at this property?"
                    >
                        <Select>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Select>
                    </FormItem>
                </div>
                <div className='py-3'>
                    <Textarea placeholder="Tell us about yourself" rows={6} />
                </div>
                <div className='grid sm:grid-cols-2 gap-5 py-2'>
                    <FormItem className=''
                        label="Education"
                    >
                        <Input />
                    </FormItem>
                    <FormItem className=''
                        label="Profession"
                    >
                        <Input />
                    </FormItem>
                </div>
                <div className='grid sm:grid-cols-2 gap-5 py-2'>
                    <FormItem className=''
                        label="Interests"
                    >
                        <Input />
                    </FormItem>
                    <FormItem className=''
                        label="Family"
                    >
                        <Input />
                    </FormItem>
                </div>
			</div>
		</>
	)
}

export default PageAddListing6
