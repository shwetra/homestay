// import React, { FC } from 'react'
// import SectionSubscribe2 from '@/components/SectionSubscribe2'
// import SocialsList from '@/shared/SocialsList'
// import Label from '@/components/Label'
// import Input from '@/shared/Input'
// import Textarea from '@/shared/Textarea'
// import ButtonPrimary from '@/shared/ButtonPrimary'

// export interface PageContactProps {}

// const info = [
// 	{
// 		title: '🗺 ADDRESS',
// 		desc: 'B-140, Rama Park, Near Dwarka Mor Metro Station. New Delhi – 110059',
// 	},
// 	{
// 		title: '💌 EMAIL',
// 		desc: 'info@homestaysofindia.com',
// 	},
// 	{
// 		title: '☎ PHONE',
// 		booking: '+91-81783 35056',
// 		listing: '+91-82875 21959',
// 		suggestion: '+91-93130 80096',
// 	},
// 	{
// 		title: '🌏 BRANCH OFFICE',
// 		desc: ' Aurora Waterfront, Floor 16, Unit 20 GN-34/1, GN Block, Sector V, Bidhannagar, Kolkata, West Bengal - 700091',
// 	},
// ]

// const PageContact: FC<PageContactProps> = ({}) => {
// 	return (
// 		<div className={`nc-PageContact overflow-hidden`}>
// 			<div className="mb-24 lg:mb-32">
// 				<h2 className="my-16 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 sm:my-20 md:text-5xl md:leading-[115%]">
// 					Contact
// 				</h2>
// 				<div className="container mx-auto max-w-7xl">
// 					<div className="grid flex-shrink-0 grid-cols-1 gap-12 sm:grid-cols-2">
// 						<div className="max-w-sm space-y-8">
// 							{info.map((item, index) => (
// 								<div key={index}>
// 									<h3 className="text-sm font-semibold uppercase tracking-wider dark:text-neutral-200">
// 										{item.title}
// 									</h3>
// 									<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
// 										<p>{item.desc}</p>
// 										<p>{item.booking ? 'Booking:' : ''}{item.booking ? item.booking : ''}</p>
// 										<p>{item.listing ? 'Homestay Listing: ' : ''}{item.listing ? item.listing : ''}</p>
// 										<p>{item.suggestion ? 'Suggestions: ' : ''}{item.suggestion ? item.suggestion : ''}</p>
// 									</span>
// 								</div>
// 							))}
// 							<div>
// 								<h3 className="text-sm font-semibold uppercase tracking-wider dark:text-neutral-200">
// 									SOCIALS
// 								</h3>
// 								<SocialsList className="mt-2" />
// 							</div>
// 						</div>
// 						<div>
// 							<form className="grid grid-cols-1 gap-6" action="#" method="post">
// 								<label className="block">
// 									<Label>Full name</Label>

// 									<Input
// 										placeholder="Your Name"
// 										type="text"
// 										className="mt-1"
// 									/>
// 								</label>
// 								<label className="block">
// 									<Label>Email address</Label>

// 									<Input
// 										type="email"
// 										placeholder="Your Email"
// 										className="mt-1"
// 									/>
// 								</label>
// 								<label className="block">
// 									<Label>Phone Number</Label>

// 									<Input
// 										type="number"
// 										placeholder="Your Mobile"
// 										className="mt-1"
// 									/>
// 								</label>
// 								<label className="block">
// 									<Label>Message</Label>

// 									<Textarea className="mt-1" rows={6} />
// 								</label>
// 								<div>
// 									<ButtonPrimary type="submit">Send Messagenm</ButtonPrimary>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			{/* OTHER SECTIONS */}
// 			{/* <div className="container">
// 				<SectionSubscribe2 className="pb-24 lg:pb-32" />
// 			</div> */}
// 		</div>
// 	)
// }

// export default PageContact



'use client'

import React, { FC, useState, ChangeEvent, FormEvent } from 'react'
import SocialsList from '@/shared/SocialsList'
import Label from '@/components/Label'
import Input from '@/shared/Input'
import Textarea from '@/shared/Textarea'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export interface PageContactProps {}

const info = [
  {
    title: '🗺 ADDRESS',
    desc: 'B-140, Rama Park, Near Dwarka Mor Metro Station. New Delhi – 110059',
  },
  {
    title: '💌 EMAIL',
    desc: 'info@homestaysofindia.com',
  },
  {
    title: '☎ PHONE',
    booking: '+91-81783 35056',
    listing: '+91-82875 21959',
    suggestion: '+91-93130 80096',
  },
  {
    title: '🌏 BRANCH OFFICE',
    desc: 'Aurora Waterfront, Floor 16, Unit 20 GN-34/1, GN Block, Sector V, Bidhannagar, Kolkata, West Bengal - 700091',
  },
]

const PageContact: FC<PageContactProps> = () => {
const nav=useRouter()
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    message: '',
	subject:"",
  })

  const { fullname, email, mobile, message ,subject} = formData

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
   if (name === 'mobile') {
  const onlyDigits = value.replace(/\D/g, ''); // Keep only digits

  if (onlyDigits.startsWith('0')) {
        if (onlyDigits.length <= 11) {
          setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
        }
      } else {
        if (onlyDigits.length <= 10) {
          setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
        }
      }
    }
 else if (name === 'fullname') {
          const onlyAlphabets = value.replace(/[^a-zA-Z\s]/g, ''); // allow letters and spaces
          setFormData((prev) => ({ ...prev, [name]: onlyAlphabets }));
        }
      else{
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))}
  }

  const handleSubmit =async (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add submission logic here
	try {

		const res = await axios.post(`https://homestay.kliffhost.in/api/contact-enquiry`, formData, {
		  headers: {
			'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY
		  },}
		);
		
		toast.success('Details submitted successfully!');
  nav.push("/")
	  } catch (error: any) {
		console.error('Error (Failure):', error.response?.data?.message || error.message);
	  }

	  setFormData({
		fullname: '',
		email: '',
		mobile: '',
		message: '',
		subject: '',
	  })
	  

  }

  return (
    <div className="nc-PageContact overflow-hidden">
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 sm:my-20 md:text-5xl">
          Contact
        </h2>

        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2">
            {/* Contact Info */}
            <div className="max-w-sm space-y-8">
              {info.map(({ title, desc, booking, listing, suggestion }, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider dark:text-neutral-200">
                    {title}
                  </h3>
                  <div className="mt-2 text-neutral-500 dark:text-neutral-400 space-y-1">
                    {desc && <p>{desc}</p>}
                    {booking && <p><strong>Booking:</strong> {booking}</p>}
                    {listing && <p><strong>Homestay Listing:</strong> {listing}</p>}
                    {suggestion && <p><strong>Suggestions:</strong> {suggestion}</p>}
                  </div>
                </div>
              ))}

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider dark:text-neutral-200">
                  SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div>
                  <Label>Full name</Label>
                  <Input
                    name="fullname"
                    value={fullname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your Name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Email address</Label>
                  <Input
                    name="email"
                    value={email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Your Email"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input
                    name="mobile"
                    value={mobile}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Your Mobile"
                    className="mt-1"
                  />
                </div>

				<div>
                  <Label>Subject</Label>
                  <Input
                    name="subject"
                    value={subject}
                    onChange={handleChange}
                
                    placeholder="Your Email"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    name="message"
                    value={message}
                    onChange={handleChange}
                    className="mt-1"
                    rows={6}
                  />
                </div>

                <div>
                  <ButtonPrimary type="submit">Send Message</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContact
