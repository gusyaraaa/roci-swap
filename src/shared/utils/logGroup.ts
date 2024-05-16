export const logGroup = (title: string, fields: Record<string, any>) => {
  console.group(title)
  Object.entries(fields).forEach(([key, value]) =>
    console.info(`${key}:`, value),
  )
  ;(console.groupEnd as any)(title)
}
