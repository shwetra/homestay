import React, { FC } from 'react'
import { PathName } from '@/routers/types'

interface Props {
	className?: string
	onClick?: () => void
	href?: PathName
}
const ButtonSubmit: FC<Props> = ({
	className = '',
	onClick = () => {},
	href = '/listing-stay',
}) => {
	return (
		<button
			type="submit"
			onClick={(e) => {
				e.preventDefault()
				onClick()
			}}
			className={`bg-primary-600 flex flex-shrink-0 cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm text-neutral-50 focus:outline-none ${className} relative z-20`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width={24}
				height={24}
				color={'currentColor'}
				fill={'none'}
				className="h-5 w-5"
			>
				<path
					d="M17.5 17.5L22 22"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
			</svg>
			<span className="ml-2">Search</span>
		</button>
	)
}

export default ButtonSubmit
