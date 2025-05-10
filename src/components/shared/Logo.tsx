'use client';
import Image from 'next/image';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeDimensions = {
    sm: { width: 208, height: 43 }, 
    md: { width: 240, height: 50 }, 
    lg: { width: 320, height: 66 }, 
  };

  const { width, height } = sizeDimensions[size];

  return (
    <Image
      src="https://i.ibb.co/hxx3KHJR/logo-removebg-preview.png"
      alt="Logo"
      width={width}
      height={height}
      className="object-contain"
      priority={true} 
    />
  );
}