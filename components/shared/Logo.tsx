import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../assets/images/WSW-LOGO-1-1.png';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`block ${className}`}>
      <Image
        src={logoImage}
        alt="When Sinners Worship Logo"
        width={120}
        height={40}
        className="h-auto w-auto"
        priority
      />
    </Link>
  );
} 