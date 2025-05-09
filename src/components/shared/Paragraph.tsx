import React from 'react'

type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Weight = 'regular' | 'medium' | 'semibold' | 'bold'

interface ParagraphProps {
	children: React.ReactNode
	size?: Size
	weight?: Weight
	className?: string
}

const sizeMap: Record<Size, string> = {
	xl: 'text-[22px] md:text-[24px] leading-[28px] tracking-[0]',
	lg: 'text-[16px] md:text-[18px] leading-[28px] tracking-[0]',
	md: 'text-[14px] md:text-[16px] leading-[26px] tracking-[0]',
	sm: 'text-[12px] md:text-[14px] leading-[24px] tracking-[0]',
	xs: 'text-[10px] md:text-[12px] leading-[22px] tracking-[0]',
	xxs: 'text-[8px] md:text-[10px] leading-[20px] tracking-[0]',
}

const weightMap: Record<Weight, string> = {
	regular: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
}

const Paragraph: React.FC<ParagraphProps> = ({
	children,
	size = 'md',
	weight = 'regular',
	className = 'font-inter',
}) => {
	const classes = `${sizeMap[size as Size]} ${weightMap[weight]} ${className}`
	return <p className={classes}>{children}</p>
}

export default Paragraph
