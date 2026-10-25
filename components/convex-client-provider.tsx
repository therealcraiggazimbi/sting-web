'use client'

import { ReactNode } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const isDev = process.env.NODE_ENV === 'development'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!, {
  logger: {
    logVerbose: isDev ? (...args: unknown[]) => console.debug(...args) : () => {},
    log: isDev ? (...args: unknown[]) => console.log(...args) : () => {},
    warn: isDev ? (...args: unknown[]) => console.warn(...args) : () => {},
    error: isDev ? (...args: unknown[]) => console.error(...args) : () => {},
  },
})

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
