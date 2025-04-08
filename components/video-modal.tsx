"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useButtonHover } from "@/contexts/ButtonHoverContext"

interface VideoModalProps {
  videoUrl: string;
  children: React.ReactNode;
}

export function VideoModal({ videoUrl, children }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setIsVideoButtonHovered } = useButtonHover()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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

