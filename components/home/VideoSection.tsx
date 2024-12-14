"use client"

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          // Reset video to beginning and ensure it's muted
          video.currentTime = 0;
          video.muted = true;
          setIsMuted(true);

          // Add loading state handling
          const handleCanPlay = async () => {
            try {
              await video.play();
              setIsPlaying(true);
              setIsLoading(false);
            } catch (error) {
              console.error("Video play failed:", error);
              setIsPlaying(false);
              setIsLoading(false);
            }
          };

          video.addEventListener('canplay', handleCanPlay);
          return () => video.removeEventListener('canplay', handleCanPlay);
        } catch (error) {
          console.error("Video setup failed:", error);
          setIsPlaying(false);
          setIsLoading(false);
        }
      };

      playVideo();
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        toast({
          title: "Video paused",
          description: "The video has been paused.",
        })
      } else {
        videoRef.current.play()
        toast({
          title: "Video playing",
          description: "The video is now playing.",
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      toast({
        title: isMuted ? "Audio unmuted" : "Audio muted",
        description: isMuted ? "The video audio is now on." : "The video audio is now off.",
      })
    }
  }

//   const handleUnmute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = false;
//       setIsMuted(false);
//       toast({
//         title: "Audio unmuted",
//         description: "The video audio is now on.",
//       });
//     }
//   };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">
              THE FACE OF WSW
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-xl">
                When Sinners Worship is more than just a ministry - it&apos;s a movement of transformation through worship.
              </p>
              
              <p className="text-lg">
                Our mission is to create an atmosphere where sinners can encounter God&apos;s presence through authentic worship.
              </p>
              
              <Card className="mt-8 bg-gray-800 border-yellow-400">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Join Us In:</h3>
                  <ul className="space-y-2 text-gray-300">
                    {['Night Vigils of Powerful Worship', 'Life-Changing Gospel Concerts', 'Community Outreach Programs', 'Worship Training Sessions'].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-yellow-400">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Video Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="max-w-md mx-auto overflow-hidden bg-black/50 shadow-xl shadow-black/20">
              <CardContent className="p-0">
                {/* Fallback text */}
                <noscript>
                  <p className="text-center p-4">
                    Your browser does not support the video tag.
                  </p>
                </noscript>

                <div className="aspect-[9/16] relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                    </div>
                  )}
                  
                  <video
                    ref={videoRef}
                    className={cn(
                      "w-full h-full object-contain transition-opacity duration-300",
                      isLoading ? "opacity-0" : "opacity-100"
                    )}
                    playsInline
                    autoPlay
                    muted
                    loop
                    preload="metadata"
                    aria-label="When Sinners Worship Ministry Video"
                  >
                    <source src="/videos/wsw-intro.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Mute Toggle Button */}
                  {!isLoading && (
                    <Button
                      onClick={toggleMute}
                      variant="outline"
                      size="icon"
                      className="absolute bottom-4 right-4 rounded-full bg-black/50 hover:bg-black/70 border-none w-10 h-10 z-20"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <p className="mt-4 text-center text-gray-400 text-sm">
              Experience the power of worship with When Sinners Worship Ministry
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

