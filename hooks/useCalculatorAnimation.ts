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
    setStartTime(null)
    setHasCompleted(false)
    onStateChange?.('initial')

    // Skip tracking state and go directly to target-hit
    const targetTimer = setTimeout(() => {
      setAnimationState('target-hit')
      onStateChange?.('target-hit')

      // Show savings after a short delay
      const savingsTimer = setTimeout(() => {
        setAnimationState('savings')
        onStateChange?.('savings')
        setProgress(100)
        setHasCompleted(true)
      }, 1000)

      return () => {
        clearTimeout(savingsTimer)
      }
    }, 4000)

    return () => {
      clearTimeout(targetTimer)
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