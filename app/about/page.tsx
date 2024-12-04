import { Metadata } from 'next';
import Image from 'next/image';
import { Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | When Sinners Worship',
  description: 'Learn about our mission, vision, and journey in transforming lives through worship.',
};

const actionPoints = [
  {
    title: 'Name and Theme',
    description: 'The phrase “WHEN SINNERS WORSHIP” is central to our vision and mission, as it reflects the commitment to drawing the unreached and underreached to God. “When Sinners Worship”, despite its potential to elicit religiousity, we are persuaded that this is a divine mandate.',
  },
  {
    title: 'Consecration',
    description: 'Using the timeless vehicle of worship, the WSW mission is the conversion and consecration of young adults and teenagers to align with God\'s purpose for their lives. We believe and trust through our inner witness that WSW will be crucial in igniting a generational fire.',
  },
  {
    title: 'Passion for Christ',
    description: 'We believe that once this fire is ignited, the passion for Christ will be emphasized in the hearts of young leaders. This will enable them to discern the burdens of the Spirit and make the Day of the Lord a reality in our times, as described in Joel 2.',
  },
  {
    title: 'Breaking Down Barriers',
    description: 'WSW is a divine mandate set to challenge traditional church environments, systems and doctrines that have kept sinners out. WSW is intentional in creating a welcoming atmosphere where they can find acceptance and a path to wholeness.',
  },
  {
    title: 'Partnerships',
    description: 'We collaborate with student fellowships, teenage outreaches, and ministries with a burden for souls in tertiary institutions and among teenagers. In partnership with the Holy Spirit, we receive the wisdom to continuously access these categories of souls.',
  },
  {
    title: 'Expansion',
    description: 'While the exact magnitude may be uncertain, we will remain committed to expanding the WSW mandate, continually refining it through consecration and alignment with God\'s will. We acknowledge that there is much to learn along the way.',
  },
  {
    title: 'Outreach',
    description: 'We will reach out to ministers, like you, who have been active in sharing the gospel with students in Nigerian universities. Your participation and guidance will be crucial in initiating and sustaining this revival movement.',
  },
  {
    title: 'Prayers for Strength',
    description: 'WSW as a spiritual move and warfare anticipates resistance from principalities and powers of this present age but we prayerfully stand firm in our commitment to this mandate.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] bg-black">
        <Image
          src="/images/about-us.JPG"
          alt="Worship Experience"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 to-brand-dark" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-gold text-center px-4">
            When Sinners Worship
          </h1>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="prose prose-invert prose-gold max-w-none">
          <p className="text-xl text-gray-300 leading-relaxed">
            When Sinners Worship (WSW) is an experience designed to explore the profound and transformative power of worship. This event is specifically designed to reach the unreached or underreached; those beyond the four walls of the church and those within the church whose lives do not reflect the fruit of salvation or whose lives simply conform to religion in tertiary institutions.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            This event delves into the heart of Christianity, as commanded by Jesus in Mark 16:15-16, &quot;Go ye into all the world and preach the gospel to every creature. He that believeth and is baptized shall be saved&quot;, emphasizing the message of God&apos;s redemption and grace leading to the restoration of fellowship with God through worship and the word.
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-black/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-gold mb-8 text-center">Our Journey</h2>
          <div className="relative aspect-video rounded-lg overflow-hidden border border-brand-gold/20">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/uK7WVmsvX98"
              title="WSW History"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      {/* Points of Action */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-brand-gold mb-12 text-center">
          Points of Action
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actionPoints.map((point, index) => (
            <div
              key={index}
              className="bg-brand-dark/50 border border-brand-gold/20 rounded-lg p-6 hover:border-brand-gold/40 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <span className="text-brand-gold text-4xl font-bold">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-brand-gold mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-300">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-brand-teal py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Be part of a movement that&apos;s transforming lives through worship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-brand-teal px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Involved
            </a>
            <a
              href="/events"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Upcoming Events
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}