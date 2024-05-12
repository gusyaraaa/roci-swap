import { useMediaQuery } from './useMediaQuery'

export function useMediaBreakpoints() {
  const isMobile = useMediaQuery('(max-width: 480px)')
  const isTablet = useMediaQuery('(max-width: 768px)')
  const isDesktopSmall = useMediaQuery('(max-width: 1024px)')
  return { isMobile, isTablet, isDesktopSmall }
}
