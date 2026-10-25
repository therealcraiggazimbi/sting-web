'use client'

import { ReactNode, useRef } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const isDev = process.env.NODE_ENV === 'development'

function makeClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  if (!url) return null
  return new ConvexReactClient(url, {
    logger: {
      logVerbose: isDev ? (...args: unknown[]) => console.debug(...args) : () => {},
      log: isDev ? (...args: unknown[]) => console.log(...args) : () => {},
      warn: isDev ? (...args: unknown[]) => console.warn(...args) : () => {},
      error: isDev ? (...args: unknown[]) => console.error(...args) : () => {},
    },
  })
}

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  // Lazy-initialise so the module can be evaluated during static prerendering
  // without a NEXT_PUBLIC_CONVEX_URL being present in the build environment.
  const clientRef = useRef<ConvexReactClient | null | undefined>(undefined)
  if (clientRef.current === undefined) {
    clientRef.current = makeClient()
  }

  if (!clientRef.current) {
    // No Convex URL — render children without the provider (static/prerender context)
    return <>{children}</>
  }

  return <ConvexProvider client={clientRef.current}>{children}</ConvexProvider>
}
