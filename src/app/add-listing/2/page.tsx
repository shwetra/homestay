'use client'
import NcInputNumber from '@/components/NcInputNumber'
import React, { FC, useState } from 'react'
import Select from '@/shared/Select'
import FormItem from '../FormItem'
import Checkbox from '@/shared/Checkbox'

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [floors, setFloors] = useState<number>(2);

  // Handle bedroom change
  const handleBedroomChange = (value: number) => {
    setBedrooms(value);
  };

    // Handle floor change
	const handleFloorChange = (value: number) => {
		setFloors(value);
	  };
	

  return (
    <>
      <h2 className="text-2xl font-semibold">Describe the structure of your homestay</h2>
      {/* FORM */}
      <div className="space-y-4" style={{ marginTop: '1rem' }}>
        {/* ITEM */}
        <FormItem label="Acreage (m2)">
          <Select>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </Select>
        </FormItem>

        <NcInputNumber label="Floors" defaultValue={2} onChange={handleFloorChange} />
        <FormItem label="Which floor do you stay in (if applicable)" >
          <Select>
			{Array.from({ length: floors }, (_, index) => (
				<option key={index} value={`Floor ${index + 1}`}>
					Floor {index + 1}
				</option>
			))}
          </Select>
        </FormItem>

        {/* NcInputNumber for Bedroom */}
        <NcInputNumber 
          label="Bedroom" 
          defaultValue={1} 
          onChange={handleBedroomChange} 
        />

        {/* Dynamic Bedroom Fields */}
        <div>
          {Array.from({ length: bedrooms }, (_, index) => (
            <div key={index} className='mt-3 bg-stone-100 p-3 rounded'>
              <label className="text-sm">Bedroom {index + 1}</label>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Checkbox label="Attached bathroom" name={`Attached_bathroom_${index}`} />
                <Checkbox label="Common bathroom" name={`Common_bathroom_${index}`} />
                <Checkbox label="External but Private" name={`External_but_Private_${index}`} />
              </div>
              <FormItem label="Which floor" className='mt-2'>
                <Select>
                  <option value="Floor 1">Floor 1</option>
                  <option value="Floor 2">Floor 2</option>
                  <option value="Floor 3">Floor 3</option>
                </Select>
              </FormItem>
            </div>
          ))}
        </div>

        <NcInputNumber label="Beds" defaultValue={4} />
        <NcInputNumber label="Bathroom" defaultValue={2} />
        <NcInputNumber label="Kitchen" defaultValue={2} />

        {/* Additional Spaces */}
        <div>
          <label className="text-md font-medium">Additional Spaces</label>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Checkbox label="Dining Area" name="Dining_Area" />
            <Checkbox label="Kitchen" name="Kitchen" />
            <Checkbox label="Living Room" name="Living_Room" />
            <Checkbox label="Terrace" name="Terrace" />
            <Checkbox label="Common Balcony" name="Common_Balcony" />
            <Checkbox label="Swimming Pool" name="Swimming_Pool" />
            <Checkbox label="Garden/Lawn" name="Garden_Lawn" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing2;
