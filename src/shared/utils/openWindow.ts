export const openWindow = (url: string, target?: string): void => {
  if (typeof window === 'undefined') return

  window.open(url, target ?? '_blank', 'noreferrer')
}
