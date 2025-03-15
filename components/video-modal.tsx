"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import { useButtonHover } from "@/contexts/ButtonHoverContext"

interface VideoModalProps {
  videoUrl: string
}

export function VideoModal({ videoUrl }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setIsVideoButtonHovered } = useButtonHover()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onHoverStart={() => setIsVideoButtonHovered(true)}
          onHoverEnd={() => setIsVideoButtonHovered(false)}
        >
          <Button
            variant="outline"
            className="
              rounded-full px-6 py-3
              border border-gray-200 bg-white text-gray-900
              transition-all duration-200 ease-in-out
              hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200
              active:bg-gray-800
              relative group
              after:absolute after:inset-0 after:rounded-full
              after:border-transparent after:border-2
              after:transition-all after:duration-200
              hover:after:scale-105 hover:after:border-gray-400/20
            "
          >
            <span className="relative flex items-center">
              <motion.span
                className="mr-2 transition-transform duration-200"
                animate={{ scale: isOpen ? 0.8 : 1 }}
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <Play className="w-4 h-4" aria-hidden="true" />
              </motion.span>
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-200 group-hover:after:w-full">
                Watch Video
              </span>
            </span>
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogHeader>
          <DialogTitle className="sr-only">RateTracker Video Demonstration</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={videoUrl}
            title="RateTracker Explainer Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}

