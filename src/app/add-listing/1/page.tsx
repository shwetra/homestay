'use client';

import React, { FC, useState } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '../FormItem'

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => { 

		const [selectedType, setSelectedType] = useState('');
		const [details, setDetails] = useState(null);
		const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const type = e.target.value;
		setSelectedType(type);
		const res = await fetch(`/api/add-listing/=${type}`);
		const data = await res.json();
		setDetails(data);
};
	return (
		<>
			<h2 className="text-2xl font-semibold">Choosing listing categories</h2>
			
			{/* FORM */}
			<div className="space-y-0" style={{marginTop:'1rem'}}>
				{/* ITEM */}
				<FormItem
					label="Type of House"
					desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
				>
					<Select onChange={handleChange} >
						<option value="Homestay">Homestay - A private house offering accommodation to guests, where the host is staying at the property.</option>
						<option value="Farmstay">Farmstay - Independent house within a working farm with lots of green open spaces.</option>
						<option value="Villa">Independent Villa/ Cottage - A standalone property with caretaker that guest can book as entire home or individual rooms.
						</option>
						<option value="Apartment">Apartment - A whole floor to the guest.
						</option>
					</Select>
				</FormItem>
				<FormItem
					label="Place name"
					desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
				>
					<Input placeholder="Places name" />
				</FormItem>
				
			</div>
		</>
	)
}

export default PageAddListing1
