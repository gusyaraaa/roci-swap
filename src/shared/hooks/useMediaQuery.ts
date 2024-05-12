import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  const handleChange = () => setMatches(window.matchMedia(query).matches)

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    handleChange()

    matchMedia.addEventListener('change', handleChange)

    return () => matchMedia.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
