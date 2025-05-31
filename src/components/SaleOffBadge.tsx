import React, { FC } from 'react'

export interface SaleOffBadgeProps {
	className?: string
	desc?: string
}

const SaleOffBadge: FC<SaleOffBadgeProps> = ({
	className = '',
	desc = '-10% today',
}) => {
	return (
		<div
			className={`nc-SaleOffBadge flex items-center justify-center rounded-full bg-red-700 px-3 py-0.5 text-xs text-red-50 ${className}`}
			data-nc-id="SaleOffBadge"
		>
			{desc}
		</div>
	)
}

export default SaleOffBadge
