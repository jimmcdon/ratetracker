import { useState, useEffect } from 'react'

export type AnimationState = 'initial' | 'tracking' | 'target-hit' | 'savings'

interface UseCalculatorAnimationProps {
  animationDuration?: number
  onStateChange?: (state: AnimationState) => void
  startPaused?: boolean
}

export const useCalculatorAnimation = ({
  animationDuration = 5.25,
  onStateChange,
  startPaused = false,
}: UseCalculatorAnimationProps = {}) => {
  const [animationState, setAnimationState] = useState<AnimationState>('initial')
  const [progress, setProgress] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [hasCompleted, setHasCompleted] = useState(false)

  const runAnimation = () => {
    // Reset state
    setAnimationState('initial')
    setProgress(0)
    setStartTime(Date.now())
    setHasCompleted(false)
    onStateChange?.('initial')

    // Start tracking after initial delay for grid and dot to be visible
    const trackingTimer = setTimeout(() => {
      setAnimationState('tracking')
      setStartTime(Date.now())
      onStateChange?.('tracking')

      // Hit target after the animation duration
      const targetTimer = setTimeout(() => {
        setAnimationState('target-hit')
        onStateChange?.('target-hit')

        // Show savings after flash effect
        const savingsTimer = setTimeout(() => {
          setAnimationState('savings')
          onStateChange?.('savings')

          // Progress animation for the savings bar
          let progressVal = 0
          const progressInterval = setInterval(() => {
            progressVal += 2
            setProgress(Math.min(progressVal, 100))

            if (progressVal >= 100) {
              clearInterval(progressInterval)
              setHasCompleted(true)
            }
          }, 40) // 50 steps over 2 seconds = 40ms per step

          return () => {
            clearInterval(progressInterval)
          }
        }, 1000) // Longer pause at target hit

        return () => {
          clearTimeout(savingsTimer)
        }
      }, animationDuration * 1000)

      return () => {
        clearTimeout(targetTimer)
      }
    }, 1000) // Show only pulsing dot for 1 second

    return () => {
      clearTimeout(trackingTimer)
    }
  }

  useEffect(() => {
    if (startPaused) {
      return
    }

    const cleanup = runAnimation()

    return () => {
      cleanup?.()
    }
  }, [animationDuration, onStateChange, startPaused])

  return {
    animationState,
    progress,
    startTime,
    hasCompleted,
    restart: runAnimation
  }
} 