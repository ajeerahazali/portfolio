'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface ZoomState {
  active: boolean
  scale: number
  originX: number
  originY: number
}

/**
 * Manages a temporary zoom-in animation triggered by a click on a hotspot.
 * Returns the zoom state and a trigger function.
 */
export function useZoom(duration = 300) {
  const [zoom, setZoom] = useState<ZoomState>({
    active: false,
    scale: 1,
    originX: 50,
    originY: 50,
  })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const triggerZoom = useCallback(
    (originX: number, originY: number, onComplete?: () => void) => {
      if (timerRef.current) return // already zooming
      setZoom({ active: true, scale: 1.15, originX, originY })
      timerRef.current = setTimeout(() => {
        setZoom({ active: false, scale: 1, originX: 50, originY: 50 })
        timerRef.current = null
        onComplete?.()
      }, duration)
    },
    [duration],
  )

  return { zoom, triggerZoom }
}