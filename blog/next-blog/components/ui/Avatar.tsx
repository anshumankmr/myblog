import Image, { ImageProps } from 'next/image';

type AvatarProps = Omit<ImageProps, 'width' | 'height' | 'className'> & {
  size?: number;
  className?: string;
};

export function Avatar({ src, alt, size = 64, className = '', ...props }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`.trim()}
      {...props}
    />
  );
}
