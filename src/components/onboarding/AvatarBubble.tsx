import React from 'react';
import Image, { StaticImageData } from 'next/image';

type Props = {
  src: StaticImageData | string;
  size?: number;
  className?: string;
};

export default function AvatarBubble({ src, size = 84, className = '' }: Props) {
  return (
    <div className={`flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image src={src} alt="avatar" width={size} height={size} className="rounded-lg" />
    </div>
  );
}
