'use client'
import React, { FC, useEffect, useState } from 'react'
import facebookSvg from '@/images/Facebook.svg'
import twitterSvg from '@/images/Twitter.svg'
import googleSvg from '@/images/Google.svg'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import Select from '@/shared/Select'
import axios from 'axios'
// import ReCAPTCHA from "react-google-recaptcha"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

const countryCodes = require('country-codes-list')

// Define a type for the country code options
interface CountryCode {
	code: string;
	callingCode: string;
}

export interface PageSignUpProps {}

const registerSocials = [
	{
		name: 'Continue with Facebook',
		href: '#',
		icon: facebookSvg,
	},
	{
		name: 'Continue with Google',
		href: '#',
		icon: googleSvg,
	},
]

const PageSignUp: FC<PageSignUpProps> = ({}) => {

	const [countryCodesList, setCountryCodesList] = useState<CountryCode[]>([]);
	const [configData, setConfigData] = useState<any>(null);
	const [registerSocial, setRegisterSocial] = useState<any>();
	const router = useRouter()

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		dob: '',
		phone: '',
		carrier_code: '',
		formatted_phone:'',
		default_country:''
	  });


	  const combineCountryCodeAndPhoneNumber = () => {
		const { carrier_code, phone } = formData;
	  
		const cleanedPhone = phone.trim().replace(/\D/g, ''); 
	  
		const formattedPhone = `${carrier_code} ${cleanedPhone}`;
		
		setFormData((prevData) => ({
		  ...prevData,
		  formatted_phone: formattedPhone,
		}));
	  };
	  
	  
	
	  

	  // Handle register form field changes
	  const handleChange = (e:any) => {
			setFormData((prevData) => {
				const updatedData = { ...prevData, [e.target.name]: e.target.value };
				return updatedData;
			});
	  };

	  // Handle register form field changes
	  const handlePhoneChange = (e:any, value:any, name:any) => {

		if(name == "phone"){
			let splitPhone = e?.split(value?.dialCode);
			setFormData({
				...formData,
				carrier_code: value?.dialCode,
				phone: splitPhone?.[1] || "",
				formatted_phone: `+${value?.dialCode}${splitPhone?.[1] || ""}`
			})
		}
		
	  };
	  

	// Handle register form submission
	const handleSubmit = async (e:any) => {
		e.preventDefault();
	
		try {
			const { data } = await axios.post(
			// `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
			`${process.env.NEXT_PUBLIC_API_URL}/api/register`,
			formData,
			{headers: {
				"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY, 
			}}
			 
		  );
		  	
			if(data.status == "success"){
				alert("Registration successful");
				setFormData({
					first_name: '',
					last_name: '',
					email: '',
					password: '',
					dob: '',
					phone: '',
					carrier_code: '',
					formatted_phone:'',
					default_country:''
				})
				router.push("/login")

			}

		}catch (error) {
		  console.error('Error submitting form:', error);
		}
	  };
	
	//   handle register config 
	const fetchConfigData = async() => {
		try { 
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/register-config`, {
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY, 
				},
			});
			if(data.status == 'success'){
				setConfigData(data)
			}
			
		} catch (error) {
			console.log(error)
		}
	}

	function onChange(value:any) {
		console.log("Captcha value:", value);
	  }

	useEffect(()=>{
		console.log("useEffect triggered");
		fetchConfigData()
	},[])


	// country code 
    useEffect(() => {
        // Get the custom list of country codes
        const countryCodesObject = countryCodes.customList('countryCode', '[{countryCode}] {countryNameEn}: +{countryCallingCode}');
        
        // Extract only the country code and calling code for display
        const countryCodesArray = Object.keys(countryCodesObject).map((key) => {
            const countryData = countryCodesObject[key];
            const match = countryData.match(/\+(\d+)/); // Extract the calling code
            return {
                code: key,
                callingCode: match ? match[0] : '',  // Default to empty if no match
            };
        });

        setCountryCodesList(countryCodesArray); // Set the state with country codes and calling codes
    }, []);


	return (
		<div className={`nc-PageSignUp`}>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-10 mt-5 flex items-center justify-center text-3xl font-semibold leading-[100%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[100%]">
					Signup
				</h2>
				<div className="mx-auto max-w-md space-y-6">
					<div className="grid gap-3">
						{/* {registerSocials.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className="nc-will-change-transform flex w-full transform rounded-lg bg-primary-50 px-4 py-3 transition-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
							>
								<Image
									className="flex-shrink-0"
									src={item.icon}
									alt={item.name}
								/>
								<h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
									{item.name}
								</h3>
							</a>
						))} */}

						{
							configData?.data?.social.facebook_login === '1' && (
								<a
									href='#'
								className="nc-will-change-transform flex w-full transform rounded-lg bg-primary-50 px-4 py-3 transition-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
							>
								<Image
									className="flex-shrink-0"
									src={facebookSvg}
									alt={'facebook'}
								/>
								<h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
									{'Continue with Facebook'}
								</h3>
							</a>
							)
						}
						{
							configData?.data?.social.facebook_login === '1' && (
								<a
									href='#'
								className="nc-will-change-transform flex w-full transform rounded-lg bg-primary-50 px-4 py-3 transition-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
							>
								<Image
									className="flex-shrink-0"
									src={googleSvg}
									alt={'google'}
								/>
								<h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
									{'Continue with Google'}
								</h3>
							</a>
							)
						}
					</div>
					{/* OR */}
					<div className="relative text-center">
						<span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
							OR
						</span>
						<div className="absolute left-0 top-1/2 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
					</div>
					{/* FORM */}
					<form className="grid grid-cols-1 gap-6" action="#" method="post" onSubmit={handleSubmit}>
						<div className='flex gap-3'>
							<label className="block">
								<span className="text-neutral-800 dark:text-neutral-200">
									First Name
								</span>
								<Input
									type="text"
									placeholder="First Name"
									className="mt-1"
									name="first_name"
									value={formData.first_name}
									onChange={handleChange}
								/>
							</label>
							<label className="block">
								<span className="text-neutral-800 dark:text-neutral-200">
									Last Name
								</span>
								<Input
									type="text"
									placeholder="Last Name"
									className="mt-1"
									name='last_name'
									value={formData.last_name}
									onChange={handleChange}
								/>
							</label>
						</div>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Email
							</span>
							<Input
								type="email"
								placeholder="Email"
								className="mt-1"
								name='email'
								value={formData.email}
								onChange={handleChange}
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Phone
							</span>
							{/* <div className='flex items-center gap-2'>
								<div className='w-[6.5rem]'>
									<Select name="carrier_code" onChange={handleChange} value={formData.carrier_code}>
										<option value="+91">+91 IN</option>
										{countryCodesList.map((country, index) => (
											<option key={index} value={country.callingCode}>
												{country.callingCode} {country.code}
											</option>
										))}
									</Select>
								</div>
								<div className='w-full flex-1'>
								<Input
									type="number"
									placeholder="Phone"
									className="mt-1 w-full flex-1"
									name='phone'
									value={formData.phone}
									onChange={handleChange}
								/>
								</div>
							</div> */}
							<PhoneInput
							country={'in'}
							value={`${formData.carrier_code}${formData.phone}`}
							onChange={(e,phone)=>handlePhoneChange(e,phone,"phone")}
							inputStyle={{
								width: '100%',
								borderRadius:'15px',
								height: '42px'
							}}
							/>
						</label>
						<label className="block">
							<span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
								Password
							</span>
							<Input type="password"
							 className="mt-1"
							 name="password"
							 value={formData.password}
							 onChange={handleChange}
							  />
						</label>
						<label className="block">
							<span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
								Birthday
							</span>
							<Input 
							type="date" 
							className="mt-1"
							name='dob'
							value={formData.dob}
							onChange={handleChange}
							 />
						</label>
						{/* {
							configData?.data?.reCaptchaEnable && (
								<label className='block'>
								<ReCAPTCHA
								sitekey="Your client site key"
								onChange={onChange}
								/>
							</label>
							)
						} */}
						<ButtonPrimary type="submit">Submit</ButtonPrimary>
					</form>

					{/* ==== */}
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						Already have an account? {` `}
						<Link href="/login" className="font-semibold underline">
							Sign in
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default PageSignUp
