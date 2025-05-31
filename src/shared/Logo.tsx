import React from 'react'
import LogoSvgLight from './LogoSvgLight'
import LogoSvg from './LogoSvg'
import Link from 'next/link'
import Image from 'next/image'

export interface LogoProps {
	className?: string
}

const Logo: React.FC<LogoProps> = ({ className = 'w-24' }) => {
	return (
		<Link
			href="/"
			className={`ttnc-logo text-primary-600 inline-block focus:outline-none focus:ring-0 w-[8rem]`}
		>
			{/* <img src="https://www.homestaysofindia.com/wp-content/uploads/2024/07/Logo-homestay.png" alt='' /> */}
			<Image src="https://www.homestaysofindia.com/wp-content/uploads/2024/07/Logo-homestay.png" alt="Logo" width={100} height={100} />
			{/* <LogoSvgLight />
			<LogoSvg /> */}
		</Link>
	)
}

export default Logo
