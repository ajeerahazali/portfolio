'use client'

import { useState, useCallback } from 'react'

/**
 * Keyboard-list navigation with arrow keys, Enter, and Escape.
 * Returns the focused index and an onKeyDown handler.
 *
 * @param totalItems  Total number of navigable items.
 * @param onEnter     Called with the current index when Enter/Space is pressed.
 * @param onEscape    Called when Escape is pressed.
 * @param loop        Whether to wrap around at boundaries (default true).
 */
export function useKeyboardNavigation(
  totalItems: number,
  onEnter?: (index: number) => void,
  onEscape?: () => void,
  loop = true,
): [number, (e: React.KeyboardEvent) => void] {
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        setFocusedIndex(i => {
          if (i >= totalItems - 1) return loop ? 0 : i
          return i + 1
        })
        return
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        setFocusedIndex(i => {
          if (i <= 0) return loop ? totalItems - 1 : 0
          return i - 1
        })
        return
      }
      if ((e.key === 'Enter' || e.key === ' ') && focusedIndex >= 0) {
        e.preventDefault()
        onEnter?.(focusedIndex)
        return
      }
      if (e.key === 'Escape') {
        onEscape?.()
        return
      }
    },
    [totalItems, focusedIndex, onEnter, onEscape, loop],
  )

  return [focusedIndex, handleKeyDown]
}