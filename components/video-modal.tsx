"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface VideoModalProps {
  videoUrl: string
}

export function VideoModal({ videoUrl }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-haspopup="dialog"
        >
          <Play className="mr-2 h-4 w-4" aria-hidden="true" />
          Watch Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
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

