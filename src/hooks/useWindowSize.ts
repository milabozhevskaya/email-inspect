import { useLayoutEffect, useState } from "react"

export const useWindowSize = () => {
  const [size, setSize] = useState<number | null>(null)

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
