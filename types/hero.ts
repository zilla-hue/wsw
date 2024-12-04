export interface OverlayImage {
  src: string;
  animation: 'stomp' | string;
  styles: {
    maxWidth: string;
    width?: string;
    height?: string;
    filter?: string;
    margin?: string | number;
    position?: 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky';
    top?: string;
    left?: string;
    transform?: string;
  }
  alt: string;
}

export interface HeroSlide {
  title?: string;
  description?: string;
  image?: string;
  backgroundImage?: string;
  overlayImage?: OverlayImage;
  primaryLink?: string;
  primaryText?: string;
  secondaryLink?: string;
  secondaryText?: string;
  alt?: string;
}
