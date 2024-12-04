import { HeroSlide } from '@/types/hero';

export const heroSlides: HeroSlide[] = [
  {
    backgroundImage: "/images/wsw-wed-2024-BGR.png",
    overlayImage: {
      src: "/images/wsw-wed-2024-TOP.png",
      animation: "stomp",
      styles: {
        maxWidth: "1920px",
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        margin: "0"
      },
      alt: "WSW Wednesday 2024 Event Banner"
    }
  },
  {
    title: "When Sinners Worship",
    description: "Join us in our journey of worship, healing, and spiritual growth. Experience the transformative power of worship.",
    image: "/images/hero-slide-1.JPG",
    primaryLink: "/events",
    primaryText: "View Events",
    secondaryLink: "/contact",
    secondaryText: "Get Involved",
    alt: "Worship service gathering"
  },
  {
    title: "Make a Difference",
    description: "Support our ministry through your generous donations. Help us continue spreading the message of hope and transformation.",
    image: "/images/hero-slide-2.JPG",
    primaryLink: "/donate",
    primaryText: "Donate Now",
    secondaryLink: "/contact",
    secondaryText: "Learn More",
    alt: "Community outreach and support"
  },
  {
    title: "Volunteer With Us",
    description: "Use your gifts and talents to serve others. Join our team of dedicated volunteers making a difference in our community.",
    image: "/images/hero-slide-3.JPG",
    primaryLink: "/contact",
    primaryText: "Join Our Team",
    secondaryLink: "/events",
    secondaryText: "See Opportunities",
    alt: "Volunteer team in action"
  }
];