import React from 'react'

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export type Weight = 'regular' | 'medium' | 'semibold' | 'bold'

interface HeaderProps {
	Tag: HeadingTag
	children: React.ReactNode
	size?: Size
	weight?: Weight
	className?: string
}

const sizeMap: Record<Size, string> = {
	xxxl: 'text-[38px] md:text-[44px] leading-[54px] tracking-[-0.01em]',
	xxl: 'text-[36px] md:text-[40px] leading-[50px] tracking-[-0.01em]',
	xl: 'text-[32px] md:text-[36px] leading-[46px] tracking-[-0.01em]',
	lg: 'text-[28px] md:text-[32px] leading-[44px] tracking-[-0.01em]',
	md: 'text-[24px] md:text-[28px] leading-[40px] tracking-[-0.01em]',
	sm: 'text-[20px] md:text-[24px] leading-[36px] tracking-[-0.01em]',
	xs: 'text-[18px] md:text-[20px] leading-[30px] tracking-[-0.01em]',
}

const weightMap: Record<Weight, string> = {
	regular: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
}

const Heading: React.FC<HeaderProps> = ({
	Tag,
	children,
	size = 'lg',
	weight = 'regular',
	className = 'font-inter',
}) => {
	const classes = `${sizeMap[size as Size]} ${weightMap[weight]} ${className}`
	return <Tag className={classes}>{children}</Tag>
}

export default Heading
