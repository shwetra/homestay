import React from 'react'
import { ReactNode } from 'react'

export interface Heading1Props {
    heading?: ReactNode
    subHeading?: ReactNode
    className?: string
}

const Heading1: React.FC<Heading1Props> = ({
    className = '',
    heading = 'Stays in India',
    subHeading,
}) => {
    return (
        <div className={`mb-12 lg:mb-16 ${className}`}>
            <h1 className="text-4xl font-semibold">{heading}</h1>
            {subHeading ? (
                subHeading
            ) : (
                ""
            )}
        </div>
    )
}

export default Heading1
