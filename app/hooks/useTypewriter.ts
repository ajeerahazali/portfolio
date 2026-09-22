'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Animates `fullText` character-by-character at `speed` ms per character.
 * Resets when `fullText` changes.
 */
export function useTypewriter(fullText: string, speed = 26): string {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setDisplayed('')
    indexRef.current = 0
    timerRef.current = setInterval(() => {
      indexRef.current += 1
      setDisplayed(fullText.slice(0, indexRef.current))
      if (
        indexRef.current >= fullText.length &&
        timerRef.current
      ) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }, speed)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [fullText, speed])

  return displayed
}

/**
 * Returns a `type` function that, when called with a string,
 * resets the local state and runs a typewriter animation via setLogText.
 * This is a stateful alternative for when you need imperative control.
 */
export function useTypewriterControl(): [
  string,
  (text: string) => void,
] {
  const [text, setText] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const type = useCallback((fullText: string) => {
    setText('')
    if (timerRef.current) clearInterval(timerRef.current)
    let index = 0
    timerRef.current = setInterval(() => {
      index += 1
      setText(fullText.slice(0, index))
      if (index >= fullText.length && timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }, 26)
  }, [])

  return [text, type]
}